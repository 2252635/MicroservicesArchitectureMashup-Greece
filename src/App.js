import React, { useState, useEffect } from "react";

import VideoSearch from "./component/YoutubeVideos"; 
import GoogleBooks from "./component/GoogleBooks";
import SpotifyMusic from "./component/SpotifyMusic";
import WikipediaSearch from "./component/MediaWikiSearch";
import Reddit from "./component/Reddit";

import SearchBox from "./component/SearchBox";
import backgroundImage from "./assets/images/back.png";
import relationshipImage from "./assets/images/relationship.jpg";

function App() {
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSearch = () => {
    setSearchKeyword(keyword);
    setNoResult(false);
    setLoading(true); 
  };

  const handleNoResult = () => {
    setNoResult(true);
    setSearchKeyword("");
    setLoading(false); // 结束加载
    alert("没有搜索到相关信息");
  };

  // 监听 searchKeyword，当它变化时，重置 loading 状态
  useEffect(() => {
    if (searchKeyword) {
      setLoading(true);
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 
    ); // 这里可以根据实际加载时间调整

      return () => clearTimeout(timer);
    }
  }, [loading]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });//滚动将是平滑的
  };

  const appStyle = {
    backgroundImage: searchKeyword ? 'none' : `url(${backgroundImage})`,
    backgroundColor: searchKeyword ? '#f7e5c3' : 'transparent',
    backgroundSize: 'cover', //背景图像大小 根据元素的大小进行缩放，以完全覆盖整个元素区域
    backgroundPosition: 'center',//背景图像在元素中的位置
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',//垂直方向上居中对齐
    justifyContent: 'flex-start',//水平方向上则紧贴容器的起始位置
    transition: 'background 0.5s ease',
  };

  const contentStyle = {
    backgroundColor: '#fefaf1',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '80%',
    maxWidth: '1200px',
    textAlign: 'center',
    marginTop: '10px',
  };

  return (
    <div className="App" style={appStyle}>
      <SearchBox 
        keyword={keyword} 
        setKeyword={setKeyword} 
        onSearch={handleSearch} 
      />
      <div style={contentStyle}>
        {loading ? (
          <div>加载中...</div> 
        ) : searchKeyword ? (
          <>
            {!noResult && (
              <WikipediaSearch 
                keyword={searchKeyword} 
                onNoResult={handleNoResult} 
              />
            )}
            {!noResult && (
              <>
                <VideoSearch keyword={searchKeyword} />
                <GoogleBooks keyword={searchKeyword} />
                <SpotifyMusic keyword={searchKeyword} />
                <Reddit keyword={searchKeyword} />
              </>
            )}
            {noResult && (
              <img 
                src={relationshipImage} 
                alt="关系" 
                style={{ maxWidth: '100%', borderRadius: '10px', opacity: 0.75 }} 
              />
            )}
          </>
        ) : (
          <img 
            src={relationshipImage} 
            alt="关系" 
            style={{ maxWidth: '100%', borderRadius: '10px', opacity: 0.75 }} 
          />
        )}
      </div>
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px 20px',
          backgroundColor: '#b39a6b',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', //水平偏移 垂直偏移 模糊半径
          cursor: 'pointer', //光标变成手形
          fontSize: '16px',
          transition: 'background-color 0.3s, transform 0.3s', //颜色 过渡时间 变形 过渡时间
          display: searchKeyword ? 'block' : 'none', //块级元素 没有显示
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#a68d5c';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#b39a6b';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        回到顶部
      </button>
    </div>
  );
}

export default App;