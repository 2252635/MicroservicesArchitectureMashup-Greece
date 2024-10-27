//Google Books API
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

import Banner from "./Banner"

import headicon from "../assets/images/book.png"
import fonebackImage from "../assets/images/fontback.jpg"
import arrowRight from "../assets/images/arrow.png";
import switchRight from "../assets/images/rightArrow.png"
import switchLeft from "../assets/images/leftArrow.png"
import sorryIcon from "../assets/images/sorry.png"

const BookSearch = ({ keyword }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  const handleSearch = () => {
    const API_KEY = 'AIzaSyBHqDJegyjdk1C9KOu3iVKoVNodyFNLlG0';
  
    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes',
      type: 'GET',
      data: {
        q: keyword,
        maxResults: 10,
        key: API_KEY,
      },
      success: (data) => {
        if (data.items) {
          const filteredResults = data.items.filter(item => {
            const title = item.volumeInfo.title.toLowerCase();
            const description = item.volumeInfo.description ? item.volumeInfo.description.toLowerCase() : '';
            const hasCoverImage = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;

            return (
              hasCoverImage && 
              (title.includes('希腊') || description.includes('希腊') ||
              title.includes('神话') || description.includes('神话') ||
              title.includes('希臘') || description.includes('希臘') ||
              title.includes('神話') || description.includes('神話') ||
              title.includes('greece') || description.includes('greece') ||
              title.includes('mythology') || description.includes('mythology'))
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
      handleSearch();
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
    bookItem: {
      flex: '0 0 30%',
      boxSizing: 'border-box',
      margin: '0 10px',
      scrollSnapAlign: 'start',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bookThumbnail: {
      width: '100%', // 确保宽度100%
      height: 'auto',
      maxHeight: '300px', // 增加最大高度
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer', // 鼠标悬停时变为指针
    },
    bookTitle: {
      fontSize: '16px',
      margin: '10px 0 5px 0',
      color: 'black',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    bookDescription: {
      fontSize: '14px',
      color: 'gray',
      cursor: 'pointer',
      textDecoration: 'none', // 去掉下划线
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
    googleLink: {
      display: 'block',
      marginTop: '20px',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'blue',
      fontSize: '18px',
    },
    searchLink: {
      textAlign: 'center',
      marginTop: '20px',
      padding:'20px'
    },
  };

  return (
    <div>
      <Banner
        imageSrc={fonebackImage}
        iconSrc={headicon}
        text="相关书籍"
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
                <div key={index} style={styles.bookItem}>
                  {item.volumeInfo.imageLinks?.thumbnail ? (
                    <a href={item.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                      <img
                        src={item.volumeInfo.imageLinks.thumbnail}
                        alt={item.volumeInfo.title}
                        style={styles.bookThumbnail}
                      />
                    </a>
                  ) : (
                    <p>无封面图片</p>
                  )}
                  <a
                    href={item.volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.bookTitle}
                  >
                    {item.volumeInfo.title || '未知标题'}
                  </a>
                  <a
                    href={item.volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.bookDescription}
                  >
                    {item.volumeInfo.description
                      ? item.volumeInfo.description.slice(0, 100) + '...'
                      : '没有描述'}
                  </a>
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
            <span>抱歉，没有找到相关书籍</span>
          </div>
        )}
      </div>
      <div style={styles.searchLink}>
        <a 
          href={`https://www.google.com/search?tbm=bks&q=${keyword}`} 
          //https://www.google.com/search：这是 Google 的搜索 URL。
          //tbm=bks：tbm 是 Google 的一种参数，用于指定搜索类型。bks 表示图书搜索（Books）。
          //q=${keyword}：这是搜索的关键词参数。
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            ...styles.googleLink, 
            color: '#B8860B', 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'underline', 
            justifyContent: 'center'
          }}
        >
          在 Google Books 中查看更多 “{keyword}” 的结果
          <img 
            src={arrowRight} 
            alt="arrow" 
            style={{ width: '16px', height: '16px', marginLeft: '5px', pointerEvents: 'none' }}
          />
        </a>
      </div>
    </div>
  );
};

export default BookSearch;