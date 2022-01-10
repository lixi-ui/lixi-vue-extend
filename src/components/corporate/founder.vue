<template>
  <div class="component-founder">
    <div class="founder-title">{{ $lang.corporateContent.ourFounder }}</div>
    <div class="fh-info">
      <div class="avatar"></div>
      <p class="name">{{ $lang.corporateContent.yeogirl }}</p>
      <p class="position">{{ $lang.corporateContent.founderCEO }}</p>
      <p class="desc">{{ $lang.corporateContent.ceoDesc }}</p>
    </div>
    <div class="founder-company-list">
      <ul>
        <li>
          <div class="company-icon">
            <i class="become"></i>
          </div>
          <div>
            <p>{{ $lang.corporateContent.becomeContent1 }}</p>
            <p>{{ $lang.corporateContent.becomeContent2 }}</p>
            <p>{{ $lang.corporateContent.becomeContent3 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.becomeContent4 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.becomeContent5 }}</p>
          </div>
          <div>
            <p v-html="$lang.corporateContent.becomeContent6"></p>
          </div>
          <div>
            <p v-html="$lang.corporateContent.becomeContent7"></p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.becomeContent8 }}</p>
          </div>
        </li>
        <li>
          <div class="company-icon">
            <i class="wisenut"></i>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutContent1 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutContent2 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutContent3 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutContent4 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutContent5 }}</p>
          </div>
          <div>
            <p v-html="$lang.corporateContent.wisenutContent6"></p>
          </div>
        </li>
        <li>
          <div class="company-icon">
            <i class="wisenut-search"></i>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutSearchContent1 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutSearchContent2 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutSearchContent3 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutSearchContent4 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.wisenutSearchContent5 }}</p>
          </div>
          <div>
            <p v-html="$lang.corporateContent.wisenutSearchContent6"></p>
          </div>
        </li>
        <li>
          <div class="company-icon">
            <i class="my-simon"></i>
          </div>
          <div>
            <p>{{ $lang.corporateContent.mySimonContent1 }}</p>
          </div>
          <div>
            <p v-html="$lang.corporateContent.mySimonContent2"></p>
            <p>{{ $lang.corporateContent.mySimonContent3 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.mySimonContent4 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.mySimonContent5 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.mySimonContent6 }}</p>
          </div>
          <div>
            <p>{{ $lang.corporateContent.mySimonContent7 }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'founder',
    data() {
      return {
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~asset/scss/base.scss";

  @media only screen and (max-width: 1023px){
    .component-founder{
      .founder-title{
        text-align: center;
        padding: r(72) 0 r(32);
        font-size: r(35);
        line-height: r(41);
        color: rgba(0,0,0,0.85);
      }
      .fh-info{
        margin-bottom: r(40);
        text-align: center;
        .avatar{
          width: 100%;
          height: auto;
          padding-top: 47.5%;
          background: url("~asset/images/corporate/FH@3x.jpg");
          background-size: 100%;
          margin-bottom: r(28);
        }
        .name{
          font-size: r(24);
          line-height: r(29);
          color: rgba(0,0,0,0.85);
          letter-spacing: 0;
          margin-bottom: r(8);
        }
        .position{
          font-size: r(14);
          line-height: r(16);
          color: rgba(0,0,0,0.45);
          margin-bottom: r(16);
        }
        .desc{
          margin: 0 r(16);
          font-size: r(16);
          line-height: r(24);
          color: rgba(0,0,0,0.65);
        }
      }
      .founder-company-list{
        padding: 0 58px;
        ul{
          li{
            margin-bottom: r(44);
            .company-icon{
              padding: 0;
              margin-bottom: r(24);
              border: none;
              i{
                display: inline-block;
                width: auto;
                height: r(56);
              }
              .become{
                width: r(178);
                background: url("~asset/images/corporate/become@3x.jpg");
                background-size: 100%;
              }
              .wisenut{
                width: r(170);
                background: url("~asset/images/corporate/FOUNDER-wisenut@3x.jpg");
                background-size: 100%;
              }
              .wisenut-search{
                width: r(142);
                background: url("~asset/images/corporate/founder-WISHNUT3@3x.jpg");
                background-size: 100%;
              }
              .my-simon{
                width: r(180);
                background: url("~asset/images/corporate/founder-MYSIMON@3x.jpg");
                background-size: 100%;
              }
            }
            >div{
              font-size: r(14);
              line-height: r(20);
              text-align: center;
              color: rgba(0,0,0,0.65);
              padding: r(20) 0;
              border-bottom: 1px solid rgba(0,0,0,0.15);
              .title{
                color: rgba(0,0,0,0.85);
                margin-bottom: r(16);
              }
              &:last-child{
                border-bottom: none;
              }
              &:nth-child(2){
                color: rgba(0,0,0,0.45);
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1024px){
    .component-founder{
      padding: 60px 0;
      .founder-title{
        text-align: center;
        padding: 32px 0;
        font-size: 56px;
        line-height: 78px;
        color: rgba(0,0,0,0.85);
      }
      .fh-info{
        margin: 40px 0 100px;
        text-align: center;
        .avatar{
          width: 860px;
          height: 408.5px;
          background: url("~asset/images/corporate/FH@3x.jpg");
          background-size: 100%;
          margin: 0 auto 32px;
        }
        .name{
          font-size: 32px;
          line-height: 38px;
          color: rgba(0,0,0,0.85);
          letter-spacing: 0;
          margin-bottom: 16px;
        }
        .position{
          font-size: 16px;
          line-height: 19px;
          color: rgba(0,0,0,0.45);
          margin-bottom: 24px;
        }
        .desc{
          width: 960px;
          font-size: 20px;
          line-height: 28px;
          color: rgba(0,0,0,0.65);
          margin: 0 auto;
        }
      }
      .founder-company-list{
        max-width: 1190px;
        margin: 0 auto 80px;
        ul{
          display: flex;
          li{
            flex: 1;
            padding: 0 36px;
            .company-icon{
              padding: 0;
              margin-bottom: 26px;
              border: none;
              i{
                display: inline-block;
                width: auto;
                height: 56px;
              }
              .become{
                width: 178px;
                background: url("~asset/images/corporate/become@3x.jpg");
                background-size: 100%;
              }
              .wisenut{
                width: 170px;
                background: url("~asset/images/corporate/FOUNDER-wisenut@3x.jpg");
                background-size: 100%;
              }
              .wisenut-search{
                width: 142px;
                background: url("~asset/images/corporate/founder-WISHNUT3@3x.jpg");
                background-size: 100%;
              }
              .my-simon{
                width: 180px;
                background: url("~asset/images/corporate/founder-MYSIMON@3x.jpg");
                background-size: 100%;
              }
            }
            >div{
              font-size: 14px;
              line-height: 20px;
              text-align: center;
              color: rgba(0,0,0,0.65);
              padding: 24px 0;
              border-bottom: 1px solid rgba(0,0,0,0.15);
              .title{
                color: rgba(0,0,0,0.85);
                margin-bottom: 8px;
              }
              &:nth-child(2){
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-style: italic;
                height: 60px;
                margin-bottom: 24px;
                padding: 0;
                border-bottom: none;
                color: rgba(0,0,0,0.45);
              }
              &:nth-child(3){
                height: 40px;
              }
              &:nth-child(5){
                display: flex;
                align-items: center;
                justify-content: center;
                height: 44px;
              }
              &:nth-child(6){
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 60px;
              }
              &:last-child{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;
              }
            }
          }
        }
      }
    }
  }
</style>