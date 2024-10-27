//人物简介 MediaWiki API
import React, { useEffect, useState } from "react";
import $ from "jquery";

import Banner from "./Banner";

import headicon from "../assets/images/head.png";
import fonebackImage from "../assets/images/fontback.jpg";
import arrowRight from "../assets/images/arrow.png";
import sorryIcon from "../assets/images/sorry.png";

function WikipediaSearch({ keyword, onNoResult }) {
  const [summaries, setSummaries] = useState([]); // 存储段落的数组
  const [loading, setLoading] = useState(false);
  const [wikiLink, setWikiLink] = useState("");
  const language = "zh";

  useEffect(() => {
    if (keyword) {
      handleSearch();
    }
  }, [keyword]);

  const handleSearch = () => {
    setLoading(true);
    const baseUrl = `https://${language}.wikipedia.org/w/api.php?action=parse&page=${keyword}&prop=text&format=json&origin=*`;
    //wikipedia.org/w/api.php Wikipedia API 的基础路径
    //action=parse：这是一个查询参数，指定了所需的 API 操作。在这里，它表明要对页面内容进行解析。
    //page=${keyword}：这是另一个查询参数，表示要解析的 Wikipedia 页面名称。${keyword} 是一个占位符，它会被定义的 keyword 变量的值替换。这个变量通常包含用户输入的搜索关键词或页面标题。
    //prop=text：这个参数指定返回的内容类型。在这里，表示要返回页面的 HTML 内容。
    //format=json：这个参数指定返回的数据格式为 JSON，这是一种常用的数据交换格式。
    //origin=*：这个参数用于跨域请求，允许所有来源访问这个 API。
    $.ajax({
      url: baseUrl,
      dataType: "jsonp",//用于处理跨域请求
      success: function (response) {
        setLoading(false);
        if (response.parse) {
          const extract = response.parse.text['*'];
          // 从 API 返回的 response 对象中，提取解析后的页面文本内容，并将其存储在 extract 常量中

          if (extract.includes("希腊神话") || extract.includes("希腊神")) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(extract, "text/html");
            const paragraphs = doc.querySelectorAll("p");
            //DOMParser 是一个用于解析字符串为 DOM 对象的接口。这里，通过 parser.parseFromString 方法将 extract 中的 HTML 内容解析为一个 DOM 文档对象 doc。
            const summaryArray = Array.from(paragraphs)
            //doc.querySelectorAll("p") 获取文档中所有的 <p> 元素（段落）。
              .map(paragraph => paragraph.textContent)
              .slice(0, 6); // 提取前三个段落

            setSummaries(summaryArray); // 存储段落
            const link = `https://${language}.wikipedia.org/wiki/${keyword}`;
            //https://${language}.wikipedia.org 将构建出一个对应语言版本的维基百科网址
            setWikiLink(link);
          } else {
            setSummaries([]); // 清空段落
            setWikiLink(""); // 清空链接
            onNoResult();
          }
        }
      },
      error: function () {
        setLoading(false);
        alert("抱歉，搜索时出现问题，请刷新此页面并重试！");
      },
    });
  };

  const showResults = () => {
    if (summaries.length > 0) {
      return (
        <div style={{ lineHeight: "1.6", padding: "0 20px", marginTop: '15px' }}>
          {summaries.map((summary, index) => (
            <p key={index} style={{ textIndent: "2em", margin: "0", padding: "0 20px", textAlign: "left" }}>
              {summary}
            </p> // 分段展示并设置段首缩进2em
          ))}
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '40px 0' }}>
          <img src={sorryIcon} alt="抱歉" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <span>抱歉，没有找到相关信息</span>
        </div>
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#fefaf1", margin: 0, padding: 0 }}>
      <Banner
        imageSrc={fonebackImage}
        iconSrc={headicon}
        text="人物简介"
      />
      {loading ? (
        <p>加载中，请稍候...</p>
      ) : (
        <div>
          {showResults()}
          {wikiLink && (
            <div style={{ position: "relative", textAlign: "right", padding: "20px" }}>
              <a
                href={wikiLink}
                target="_blank"//浏览器在新窗口或新标签页中打开链接
                rel="noopener noreferrer"//防止新打开的页面能够通过 window.opener 访问原始页面
                style={{ color: "#B8860B", textDecoration: "underline", marginRight: "10px" }}//为文本添加下划线
              >
                点击查看完整介绍
              </a>
              <img src={arrowRight} alt="arrow" style={{ width: "20px", height: "20px", verticalAlign: "middle" }} />
              {/* 垂直居中对齐 */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WikipediaSearch;