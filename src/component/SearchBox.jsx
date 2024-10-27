//搜索框组件
import React from "react";
import SideCss from "../assets/images/side.jpg";
import logo from "../assets/images/logo.png";

function SearchBox({ keyword, setKeyword, onSearch }) {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column', // 垂直排列容器内容
      alignItems: 'center', // 中心对齐
      width: '100%',
    };
  
    const imageContainerStyle = {
      display: 'flex',
      justifyContent: 'center', // 水平居中
      width: '100%', // 占据整行
      height: '40px', // 可以调整图片高度以适应您的需求
      backgroundImage: `url(${SideCss})`, // 设置背景图片
      backgroundRepeat: 'repeat-x', // 横向重复
      backgroundSize: 'contain', // 按比例缩放以适应容器
    };
  
    const searchBoxStyle = {
      backgroundColor: 'rgb(90, 58, 41)', // 设置背景色为棕色
      height: '50px',
      display: 'flex', // 使用flex布局
      alignItems: 'center', // 垂直居中
      width: '100%', // 占据整行
    };
    
    const titleContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      marginRight: 'auto', // 推动后面的元素向右
    };
    
    const inputButtonContainerStyle = {
      display: 'flex',
      justifyContent: 'center', // 水平居中
      alignItems: 'center',
      flex: 1, // 占据剩余空间
    };
    
    const inputStyle = {
      marginLeft: '10px',
      marginRight: '5px',
      flex: '1',
      maxWidth: '250px',
      padding: '10px', // 内边距
      border: 'none', // 去掉边框
      borderRadius: '25px', // 圆角
      backgroundColor: '#e7d8c3', // 浅色背景
      color: '#5a3a29', // 深色文字
      outline: 'none', // 去掉选中时的白边
    };

    const titleStyle = {
        color: 'white', // 文字颜色
        marginLeft: '10px', // 添加左侧间距
        fontSize: '16px'
    };

    const buttonStyle = {
      backgroundColor: '#b39a6b', // 暗黄色背景
      color: 'white',
      border: 'none',
      borderRadius: '25px', // 圆角
      padding: '8px 16px', // 内边距
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.3s',
    };
    
    // 在button的onMouseEnter和onMouseLeave中增加效果
    const handleMouseEnter = (e) => {
      e.currentTarget.style.backgroundColor = '#a68d5c'; // 悬停颜色
      e.currentTarget.style.transform = 'scale(1.05)';
    };
    
    const handleMouseLeave = (e) => {
      e.currentTarget.style.backgroundColor = '#b39a6b'; // 恢复颜色
      e.currentTarget.style.transform = 'scale(1)';
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onSearch(); // 按下回车时调用搜索
      }
    };
  
    return (
      <div style={containerStyle}>
        <div style={imageContainerStyle}></div>
        <div style={searchBoxStyle}>
          <div style={titleContainerStyle}>
            <img src={logo} alt="图标" style={{ width: '30px', height: '30px' }} />
            <span style={titleStyle}>Εξερεύνηση Θεών της Ελλάδας</span>
          </div>
          <div style={inputButtonContainerStyle}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={inputStyle}
              placeholder="请输入希腊神话人物的姓名" // 添加提示信息
              onKeyPress={handleKeyPress} // 添加按键事件处理器
            />
            <button
              onClick={onSearch}
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              搜索
            </button>
          </div>
        </div>
      </div>
    );
}

export default SearchBox;