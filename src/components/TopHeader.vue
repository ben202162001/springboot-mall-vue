<template>
    <header class="top-header" style="background-color: #f3e8fd;">
      <div class="logo">某某電商網站</div>
      <nav class="nav-links">
        <ul>
          <li><a href="http://localhost:3000/">首頁</a></li>
          <li><a href="#">產品</a></li>
          <li><a href="#">關於我們</a></li>
          <li><a href="#">聯繫我們</a></li>
          <!-- 添加更多導航連結 -->
        </ul>
      </nav>
      <div class="user-actions">

      <p v-if="this.$store.state.user">
        <a> HI!{{ this.$store.state.user.userName }} </a>
        <a href="http://localhost:3000/Login">登出</a>
      </p>
      <p v-else>
        <a href="http://localhost:3000/Login">登入</a>
        <a href="#">註冊</a>
        <!-- 添加其他用戶操作連結，如購物車 --></p>
        
      </div>
    </header>
  </template>
  
  <script>
//   export default {
//    mounted() {
//     this.$store.subscribe(() => {
//       console.log('下面是top的全域store');
//       console.log(this.$store.state);
//       console.log(this.$store.state.user);
//       console.log(this.$store.state.user.userName);
//     });
//   }
// };
  </script>
  
  <style scoped>
  /* 添加 header 的 CSS 樣式 */
  .top-header {
    background-color: #ffffff;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dddddd;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
  
  .nav-links ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-links ul li {
    display: inline;
    margin-right: 20px;
  }
  
  .nav-links ul li a {
    text-decoration: none;
    color: #333333;
  }
  
  .user-actions a {
    text-decoration: none;
    color: #333333;
    margin-left: 20px;
  }
  </style>
  