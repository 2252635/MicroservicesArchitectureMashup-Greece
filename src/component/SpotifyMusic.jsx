//Spotify API 
import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import Banner from "./Banner";

import headicon from "../assets/images/music.png";
import fonebackImage from "../assets/images/fontback.jpg";
import arrowRight from "../assets/images/arrow.png";
import sorryIcon from "../assets/images/sorry.png"

const MusicSearch = ({ keyword }) => {
  const [results, setResults] = useState({ tracks: [], albums: [], artists: [] });
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [audioStates, setAudioStates] = useState({}); // 用于存储每首歌曲的状态

  const getAccessToken = () => {
    const CLIENT_ID = '1bdced985bae443a82b2712e01864d69';
    const CLIENT_SECRET = '7f2151c544d844b1a5e58b4b985db11d';
    const base64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    $.ajax({
      url: 'https://accounts.spotify.com/api/token',
      //'https://accounts.spotify.com/api/token': 这是 Spotify 的 OAuth 2.0 身份验证服务器的 URL。该端点用于获取访问令牌（access token），以便访问 Spotify API。
      type: 'POST',
      headers: {
        'Authorization': `Basic ${base64}`,
        'Content-Type': 'application/x-www-form-urlencoded',//URL 编码格式，适合发送表单数据
      },
      data: 'grant_type=client_credentials',//请求客户端凭据授权
      success: (data) => {
        setToken(data.access_token);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        setError('获取访问令牌失败，请重试');
        console.error(textStatus, errorThrown);
      },
    });
  };

  const handleSearch = () => {
    if (!token) return;

    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        q: keyword,
        type: 'track,album,artist',
        limit: 10,
      },
      success: (data) => {
        const tracks = data.tracks.items.filter(item => item.name.includes(keyword));
        const albums = data.albums.items.filter(item => item.name.includes(keyword));
        const artists = data.artists.items.filter(item => item.name.includes(keyword));
        
        setResults({ tracks, albums, artists });
        setError('');
      },
      error: (jqXHR, textStatus, errorThrown) => {
        setError('网络错误，请重试');
        console.error(textStatus, errorThrown);
      },
    });
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (keyword && token) {
      handleSearch();
    }
  }, [keyword, token]);

  const handleTitleClick = (id, type) => {
    const urlMap = {
      artist: `https://open.spotify.com/artist/${id}`,
      album: `https://open.spotify.com/album/${id}`,
      track: `https://open.spotify.com/track/${id}`,
    };
    window.open(urlMap[type], '_blank');
  };

  const styles = {
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
      color:'#aa8f84'
    },
    musicRow: {
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto',
      padding: '0 50px',
      maxWidth: '100%',
      overflowY: 'hidden',
      scrollbarWidth: 'thin', // Firefox
      scrollbarColor: '#b39a6b #e7d8c3', // 滚动条颜色和背景颜色
    },
    musicItem: {
      flex: '0 0 50%',
      textAlign: 'center',
      margin: '0 10px',
    },
    musicThumbnail: {
      width: '100%',
      height: 'auto',
      maxHeight: '400px',
    },
    musicTitle: {
      fontSize: '16px',
      margin: '10px 0 5px 0',
      cursor: 'pointer',
      color: 'black',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
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
        text="相关音乐"
      />
      {error && <p style={styles.errorText}>{error}</p>}
  
      <h2 style={styles.title}>相关歌曲</h2>
      <div style={styles.musicRow} id="tracks">
        {results.tracks.length > 0 ? (
          results.tracks.map((item) => {
            const trackUrl = item.preview_url;
            return (
              <div key={item.id} style={styles.musicItem}>
                {item.album.images[0] && (
                  <h3
                    style={styles.musicTitle}
                    onClick={() => handleTitleClick(item.id, 'track')}
                  >
                    <img
                      src={item.album.images[0].url}
                      alt={item.name}
                      style={styles.musicThumbnail}
                      onClick={() => handleTitleClick(item.id, 'track')}
                    />
                    {item.name}
                  </h3>
                )}
                <audio src={trackUrl} controls />
              </div>
            );
          })
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '40px 0' }}>
            <img src={sorryIcon} alt="抱歉" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <span>抱歉，没有找到相关歌曲</span>
          </div>
        )}
      </div>
  
      <h2 style={styles.title}>相关专辑</h2>
      <div style={styles.musicRow} id="albums">
        {results.albums.length > 0 ? (
          results.albums.map((item) => (
            <div key={item.id} style={styles.musicItem}>
              {item.images[0] && (
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  style={styles.musicThumbnail}
                  onClick={() => handleTitleClick(item.id, 'album')}
                  className="clickable"
                />
              )}
              <h3
                style={styles.musicTitle}
                onClick={() => handleTitleClick(item.id, 'album')}
              >
                {item.name}
              </h3>
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '40px 0' }}>
            <img src={sorryIcon} alt="抱歉" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <span>抱歉，没有找到相关专辑</span>
          </div>
        )}
      </div>
  
      <h2 style={styles.title}>相关艺术家</h2>
      <div style={styles.musicRow} id="artists">
        {results.artists.length > 0 ? (
          results.artists.map((item) => (
            item.images[0] && ( // 添加此条件以确保图片存在
              <div key={item.id} style={styles.musicItem}>
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  style={styles.musicThumbnail}
                  onClick={() => handleTitleClick(item.id, 'artist')}
                  className="clickable"
                />
                <h3
                  style={styles.musicTitle}
                  onClick={() => handleTitleClick(item.id, 'artist')}
                >
                  {item.name}
                </h3>
              </div>
            )
          ))
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '40px 0' }}>
            <img src={sorryIcon} alt="抱歉" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <span>抱歉，没有找到相关艺术家</span>
          </div>
        )}
      </div>
  
      <div style={styles.searchLink}>
        <a 
          href="https://open.spotify.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#B8860B', textDecoration: 'underline', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          前往 Spotify
          <img 
            src={arrowRight} 
            alt="Arrow Right" 
            style={{ marginLeft: '5px', cursor: 'default', width: '16px', height: '16px' }} // 不允许点击箭头
          />
        </a>
      </div>
    </div>
  );
};

export default MusicSearch;