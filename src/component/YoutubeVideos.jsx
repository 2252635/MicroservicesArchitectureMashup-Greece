//YouTube API
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

import Banner from "./Banner"

import headicon from "../assets/images/video.png"
import fonebackImage from "../assets/images/fontback.jpg"
import arrowRight from "../assets/images/arrow.png";
import switchRight from "../assets/images/rightArrow.png"
import switchLeft from "../assets/images/leftArrow.png"
import sorryIcon from "../assets/images/sorry.png"

const VideoSearch = ({ keyword }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  // 进行搜索请求
  const handleSearch = () => {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      //https://www.googleapis.com/youtube/v3/search: 这是 YouTube Data API v3 的搜索端点
      type: 'GET',
      data: {
        part: 'snippet',
        //part: 'snippet' 是 YouTube Data API 请求中的一个关键参数，它定义了你希望从 API 返回的特定数据部分。
        //snippet:
        //title: 视频、频道或播放列表的标题。
        //description: 描述信息，通常是视频内容的简要说明。
        //thumbnails: 视频的缩略图，包含不同尺寸的图像链接。
        //channelTitle: 发布视频的频道名称。
        //publishedAt: 视频发布的日期和时间。
        //channelId: 频道的唯一标识符。
        q: keyword,
        type: 'video',
        maxResults: 10,
        key: 'AIzaSyBHqDJegyjdk1C9KOu3iVKoVNodyFNLlG0',
      },
      success: (data) => {
        if (data.items) {
          const filteredResults = data.items.filter(item => {
            const title = item.snippet.title.toLowerCase();
            const description = item.snippet.description.toLowerCase();
            return (
              title.includes('希腊') || description.includes('希腊') ||
              title.includes('神话') || description.includes('神话') ||
              title.includes('希臘') || description.includes('希臘') ||
              title.includes('神話') || description.includes('神話') ||
              title.includes('greece') || description.includes('greece') ||
              title.includes('mythology') || description.includes('mythology')
            );
          });
          setResults(filteredResults);
          setError('');
        } else {
          setError('搜索失败，请重试');
          setResults([]);
        }
      },
      error: (jqXHR, textStatus, errorThrown) => {
        setError('网络错误，请重试');
        console.error(textStatus, errorThrown);
      },
    });
  };

  useEffect(() => {
    if (keyword) {
      handleSearch(); // 关键词存在时执行搜索
    }
  }, [keyword]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const styles = {
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    carousel: {
      display: 'flex',
      alignItems: 'flex-start',
      overflowX: 'hidden',
      scrollSnapType: 'x mandatory',
    },
    videoItem: {
      flex: '0 0 30%', // 每个视频占据 30% 的宽度
      boxSizing: 'border-box',
      margin: '0 10px',
      scrollSnapAlign: 'start',
      textAlign: 'center',
      cursor: 'pointer',
      height: '430px', // 设置固定高度
      border: '1px solid #ddd', // 添加边框
      borderRadius: '10px', // 圆角
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // 添加阴影
      padding: '10px', // 内边距
      transition: 'transform 0.2s', // 添加缩放效果
    },
    videoThumbnail: {
      width: '100%',
      height: '180px', // 设置固定高度
      borderRadius: '10px', // 给缩略图添加圆角
      objectFit: 'cover', // 确保缩略图填满
    },
    videoTitle: {
      fontSize: '16px',
      margin: '10px 0 5px 0',
    },
    videoDescription: {
      fontSize: '14px',
      color: 'gray',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
    },
    button: {
      cursor: 'pointer',
      padding: '10px',
      backgroundColor: '#fefaf1',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      margin: '0 10px',
    },
    youtubeSearchLink: {
      display: 'block',
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '16px',
      color: '#1e90ff',
      textDecoration: 'none',
    },
    searchLink: {
      textAlign: 'center',
      marginTop: '20px',
      padding:'20px'
    },
  };

  // YouTube 搜索结果页面的链接
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;

  return (
    <div>
      <Banner
        imageSrc={fonebackImage}
        iconSrc={headicon}
        text="相关视频"
      />
      {error && <p style={styles.errorText}>{error}</p>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
        {results.length > 0 ? (
          <>
            <button onClick={scrollLeft} style={styles.button}>
              <img src={switchLeft} alt="左箭头" style={{ width: '35px', height: '35px' }} />
            </button>
            <div ref={scrollRef} style={styles.carousel}>
              {results.map((item, index) => (
                <div
                  key={index}
                  style={styles.videoItem}
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${item.id.videoId}`, '_blank')}
                >
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                    style={styles.videoThumbnail}
                  />
                  <h3 style={styles.videoTitle}>{item.snippet.title || '未知标题'}</h3>
                  <p style={styles.videoDescription}>{item.snippet.description || '没有描述'}</p>
                </div>
              ))}
            </div>
            <button onClick={scrollRight} style={styles.button}>
              <img src={switchRight} alt="右箭头" style={{ width: '35px', height: '35px' }} />
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '100px 0' }}>
            <img src={sorryIcon} alt="抱歉" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <span>抱歉，没有找到相关视频</span>
          </div>
        )}
      </div>
      <div style={styles.searchLink}>
        <a 
          href={youtubeSearchUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            ...styles.youtubeSearchLink, 
            color: '#B8860B', 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'underline', // 添加下划线
            justifyContent: 'center' // 居中
          }}
        >
          在 YouTube 上查看 "{keyword}" 的更多结果
          <img 
            src={arrowRight} 
            alt="arrow" 
            style={{ width: '16px', height: '16px', marginLeft: '5px', pointerEvents: 'none' }} // 图标不可点击
          />
        </a>
      </div>
    </div>
  );
};

export default VideoSearch;