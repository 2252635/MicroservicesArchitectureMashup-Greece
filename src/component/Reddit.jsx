//Reddit API 
import React, { useEffect, useState } from 'react';
import $ from 'jquery';

import Banner from "./Banner";

import headicon from "../assets/images/discuss.png";
import fonebackImage from "../assets/images/fontback.jpg";
import arrowRight from "../assets/images/arrow.png";
import sorryIcon from "../assets/images/sorry.png";

const RedditSearch = ({ keyword }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = () => {
      if (!keyword) return;

      setLoading(true);
      $.ajax({
        url: `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}`,
        //https://www.reddit.com/search.json: 这是 Reddit 的搜索 API 端点，返回与查询匹配的搜索结果，并以 JSON 格式响应。
        //?q=: 这是 URL 中的查询参数，表示我们要搜索的关键词。q 是查询字符串的参数名称。
        //${encodeURIComponent(keyword)}: 这个部分使用模板字面量将 keyword 的值插入到 URL 中。
        method: 'GET',
        success: (data) => {
          const filteredResults = data.data.children.filter(item =>
            item.data.title.includes(keyword) // 过滤标题包含关键词的结果
          );
          setResults(filteredResults);
          setLoading(false);
        },
        error: (error) => {
          console.error('Error fetching data from Reddit:', error);
          setLoading(false);
        },
      });
    };

    handleSearch();
  }, [keyword]);

  return (
    <div>
      <Banner
        imageSrc={fonebackImage}
        iconSrc={headicon}
        text="相关讨论"
      />
      {loading && <p>Loading...</p>}
      {results.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {results.slice(0, 8).map((item) => (  // 仅显示前八条结果 istStyleType: 'none's列表项将不显示任何标记
            <li key={item.data.id} style={{ margin: '10px 0', borderBottom: '1px solid #d0c29c', paddingBottom: '10px' }}>
              <a
                href={`https://reddit.com${item.data.permalink}`}
                //https://reddit.com: 这是 Reddit 网站的主域名。
                //item.data.permalink 是 Reddit 返回的每个帖子的部分链接
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#5b3d29', fontWeight: 'bold' }}
              >
                {item.data.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '40px 0' }}>
          <img src={sorryIcon} alt="抱歉" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <span>抱歉，没有找到相关信息</span>
        </div>
      )}
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <a
          href={`https://www.reddit.com/search?q=${encodeURIComponent(keyword)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#B8860B', textDecoration: 'underline', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          点击这里前往Reddit查看所有相关讨论
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

export default RedditSearch;