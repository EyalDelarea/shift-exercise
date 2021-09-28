<template>
  <div class="wrapper">
    <div class="content">
      <ul>
          
        <a target="_blank" href="https://www.linkedin.com/in/eyaldelarea/">
          <!-- <img src="../../assets/linkedin-logo.png" alt="" /> -->
          Linkedin

        </a>
        
      </ul>
      <ul>
        <a target="_blank" href="https://github.com/EyalDelarea/">
          <img src="../../assets/github-icon.png" alt="" />
          Github</a
        >
      </ul>
      <a target="_blank" href="mailto:eyaldelarea@gmail.com">
        <ul>
          eyaldelarea@gmail.com
        </ul>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  margin-top: 40px;
  width: 100%;
  background: #6dc8fd98;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}
a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
}

a:hover{
  color:white;
}

img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  object-fit: scale-down;
}
</style>
