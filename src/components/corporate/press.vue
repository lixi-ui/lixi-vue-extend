<template>
  <div class="component-press">
    <div class="press-title">Press</div>
    <div class="press-list">
      <ul>
        <li v-for="item in pressList">
          <p class="title">{{ item.title }}</p>
          <p class="content">{{ item.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'press',
    data() {
      return {
        pressList: [
          {
            title: 'E-Commerce Leader',
            content: 'Cross-Border E-Commerce Leader – South Korea Legal Person of Gshopper Awards ‘Exporting 20 Million US Dollars Prize’ A'
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price'
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price'
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price'
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price',
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price'
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price'
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price'
          },
          {
            title: 'Double 11',
            content: 'Focusing on Top Goods from South Korea & Japan, Gshopper.com Fighting for Double 11 with High Quality and Lower Price'
          },
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~asset/scss/base.scss";

  @media only screen and (max-width: 1023px){
    .component-press{
      .press-title{
        text-align: center;
        padding: r(24) 0 r(16);
        font-size: r(24);
        line-height: r(33);
        color: rgba(0,0,0,0.65);
      }
      .press-list{
        padding: 0 r(16);
        ul{
          li{
            text-align: center;
            padding: r(16) 0;
            box-sizing: border-box;
            .title{
              font-size: r(16);
              line-height: r(19);
              color: #FF5224;
              margin-bottom: r(16);
              font-weight: 500;
            }
            .content{
              font-size: r(13);
              color: rgba(0,0,0,0.85);
              line-height: r(21);
              padding: 0 r(16);
            }
            &.active{
              background-color: $mainColor;
              opacity: 0.9;
              p{
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1024px){
    .component-press{
      .press-title{
        text-align: center;
        padding: 32px 0;
        font-size: 56px;
        line-height: 78px;
        color: rgba(0,0,0,0.65);
      }
      .press-list{
        max-width: 996px;
        margin: 0 auto 64px;
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width: 33.3%;
            text-align: center;
            padding: 20px 16px;
            box-sizing: border-box;
            cursor: pointer;
            .title{
              font-size: 16px;
              line-height: 19px;
              color: #FF5224;
              margin-bottom: 16px;
              font-weight: 500;
            }
            .content{
              font-size: 13px;
              color: rgba(0,0,0,0.85);
              line-height: 21px;
            }
            &:hover{
              background-color: $mainColor;
              opacity: 0.9;
              p{
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>