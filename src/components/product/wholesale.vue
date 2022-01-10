<template>
  <div class="wholesale-container">
    <div class="title" @click="showDialog">
      <svg class="icon-wholesale" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-954.000000, -638.000000)" fill-rule="nonzero">
            <g transform="translate(946.000000, 631.000000)">
              <g transform="translate(8.000000, 7.000000)">
                <rect fill="#000000" opacity="0" x="0" y="0.308759456" width="11.508761" height="11.508761"></rect>
                <path d="M11.4950149,8.0065664 C11.4659018,7.8997976 11.3955126,7.8089952 11.2993716,7.75418584 C11.2032306,7.69937656 11.0892358,7.68506272 10.9825288,7.71440144 L4.53574128,9.4482328 C4.28410069,9.12300888 3.88765089,8.94361984 3.47724199,8.96927384 L1.82004402,2.75717626 C1.75227298,2.49406182 1.57899975,2.27053935 1.34108506,2.13931922 L0.627436227,1.71783534 C0.429026872,1.60157609 0.173943977,1.66802626 0.0574750782,1.86631262 C-0.0583997979,2.06741724 0.0101178548,2.32435845 0.210741935,2.44106335 L1.00102421,2.88649518 L2.71090766,9.32370352 C2.2907901,9.71937128 2.19187855,10.3492884 2.47050964,10.8546758 C2.74914073,11.3600633 3.33460609,11.6126686 3.89344482,11.4686164 C4.45228355,11.3245643 4.84267886,10.8204109 4.842275,10.2433047 L11.1836915,8.52384208 C11.295073,8.49907496 11.3914258,8.42971752 11.4502638,8.33195592 C11.5091018,8.2341944 11.5252771,8.116582 11.4950149,8.0065664 Z M11.0160559,6.39247471 L9.38759544,0.324064784 C9.36043512,0.21409528 9.29062232,0.11945804 9.19357008,0.061047008 C9.09651792,0.002635984 8.98020824,-0.0147449864 8.87031976,0.012741464 L2.835437,1.65078108 C2.61414879,1.715776 2.48468775,1.9449857 2.54327204,2.16805675 L4.1621533,8.23646664 C4.22291869,8.45902992 4.45132874,8.59137968 4.67463938,8.5334212 L10.7095222,6.90496078 C10.8196626,6.88022828 10.9148264,6.8113777 10.972771,6.71450141 C11.0307158,6.61762511 11.0463631,6.50121329 11.0160559,6.39247471 L11.0160559,6.39247471 Z M7.47397671,3.67337577 C7.44042827,3.78480678 7.37615869,3.97597085 7.28133841,4.24684384 C7.25561489,4.32264347 7.23672098,4.38763727 7.22492198,4.44181065 C7.21308316,4.49569114 7.2073049,4.54293899 7.20777488,4.58326356 C7.20802102,4.62205429 7.21179816,4.66110546 7.21905092,4.69984459 C7.2261361,4.73722388 7.24052606,4.80199714 7.26225926,4.89425075 C7.31476288,5.08684792 7.26790778,5.21579934 7.12176822,5.28086486 C7.04582555,5.31467671 6.96857628,5.31360968 6.8905523,5.2778411 C6.81252833,5.24207251 6.74743493,5.16586275 6.69573042,5.04973251 C6.63084972,4.90400807 6.59369797,4.76959558 6.58427182,4.64597884 C6.57484568,4.5223621 6.58358961,4.40628926 6.61044589,4.29763071 C6.63743614,4.18917134 6.67959819,4.05557966 6.73689554,3.89707898 C6.78709854,3.75825068 6.82217813,3.65493839 6.84177352,3.58704391 C6.86145517,3.51928562 6.87211797,3.44791568 6.87345631,3.37497957 C6.87495206,3.30163229 6.85986928,3.22940241 6.82822719,3.15833312 C6.76646262,3.0196076 6.67084494,2.92194165 6.54146835,2.86524156 C6.4121309,2.80873112 6.278587,2.81093403 6.14129294,2.87206129 C5.9804487,2.94367375 5.88348339,3.0445143 5.85033929,3.1744533 C5.81727212,3.30456512 5.81600768,3.47497668 5.8467542,3.68564703 C5.88439179,3.90375806 5.8336835,4.04358783 5.69476398,4.10543879 C5.61284872,4.14190982 5.52857074,4.13848483 5.44185311,4.09499103 C5.35515539,4.05164366 5.29389018,3.98993266 5.25842026,3.91026594 C5.18503755,3.74544568 5.15541327,3.55876162 5.16928147,3.35012508 C5.18307274,3.14131574 5.25089996,2.94339098 5.37251645,2.75630534 C5.4940759,2.56919332 5.66893045,2.42487382 5.89690966,2.32337093 C6.10874774,2.22905454 6.31661672,2.19205165 6.52017638,2.21251373 C6.72366042,2.23300947 6.90512004,2.30343081 7.06468719,2.4236672 C7.22413959,2.54374762 7.34559681,2.6975172 7.4289434,2.88471672 C7.49453581,3.03203968 7.5268174,3.17250306 7.52582911,3.30594359 C7.52477551,3.43934092 7.50741041,3.56178876 7.47397671,3.67337577 L7.47397671,3.67337577 Z M7.3632403,5.57965002 C7.47487459,5.57965002 7.56886554,5.61813678 7.64498401,5.69475474 C7.72110247,5.77159491 7.75923044,5.86603411 7.75923044,5.97833898 C7.75923044,6.1031765 7.71936105,6.20130438 7.63966809,6.27267818 C7.5599293,6.34396312 7.46786308,6.37965002 7.3632403,6.37965002 C7.25518049,6.37965002 7.16082293,6.34449642 7.0801676,6.27401145 C6.99946645,6.20348203 6.95923044,6.10495418 6.95923044,5.97833898 C6.95923044,5.86607855 6.99813747,5.77159491 7.07618066,5.69475474 C7.15422386,5.61813678 7.2499104,5.57965002 7.3632403,5.57965002 L7.3632403,5.57965002 Z" id="形状" fill="#555555"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      {{ $lang.wholesale.wholesaleInquiry }}
    </div>
    <van-dialog class="wholesale-dialog-wrap"
                :closeOnClickOverlay="true"
                v-model="visibleWholesaleDialog"
                :showConfirmButton="false">
      <div class="wholesale-dialog">
        <p class="dialog-title">{{ $lang.wholesale.wholesaleInquiry }}</p>
        <el-form class="wholesale-form" ref="wholesaleForm" :model="wholesaleForm" :rules="rules">
          <el-form-item prop="goods_name">
            <div class="wholesale-form-item">
              <label class="form-label required">{{ $lang.wholesale.productName }}</label>
              <el-input v-model="wholesaleForm.goods_name"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="skuId">
            <div class="wholesale-form-item">
              <label class="form-label">{{ $lang.wholesale.productId }}</label>
              <el-input v-model="wholesaleForm.sku_id"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="quantity">
            <div class="wholesale-form-item">
              <label class="form-label required">{{ $lang.wholesale_quantity }}</label>
              <el-input v-model.number="wholesaleForm.quantity"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="wholesale-form-item">
              <label class="form-label required">{{ $lang.wholesale.country }}</label>
              <el-select class="countrySelect"
                         @change="handleCountry"
                         v-model="wholesaleForm.country">
                <el-option v-for="item in countryCurrency"
                           :key="item.countryId"
                           :label="item.countryName"
                           :value="item.countryId">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <div class="form-item-inline">
            <el-form-item>
              <div class="wholesale-form-item">
                <label class="form-label">{{ $lang.wholesale.currency }}</label>
                <el-input v-model="wholesaleForm.currency" disabled></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="target_price">
              <div class="wholesale-form-item">
                <label class="form-label required">{{ $lang.wholesale.targetPrice }}</label>
                <el-input v-model="wholesaleForm.target_price"></el-input>
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <div class="wholesale-form-item">
              <label class="form-label">{{ $lang.wholesale.customerNote }}</label>
              <el-input type="textarea" v-model="wholesaleForm.remarks"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="user_name">
            <div class="wholesale-form-item">
              <label class="form-label required">{{ $lang.wholesale.customerName }}</label>
              <el-input v-model="wholesaleForm.user_name" auto-complete="autocomplete"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="user_email">
            <div class="wholesale-form-item">
              <label class="form-label required">{{ $lang.wholesale.email }}</label>
              <el-input v-model="wholesaleForm.user_email"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form-center">
              <el-button type="primary"
                         :disabled="submitLoading"
                         @click="submitForm('wholesaleForm')">
                {{ $lang.submit }}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
        <i class="el-icon-close" @click="visibleWholesaleDialog = false"></i>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { getCookie } from '../../framework/utils/utils';
  export default {
    name: 'wholesale',
    data() {
      return {
        visibleWholesaleDialog: false,
        wholesaleForm: {
        },
        countryCurrency: [],
        rules: {},
        submitLoading: false,
      };
    },
    watch: {
      'wholesaleForm.quantity': function(newVal) {
        if (newVal > 999999999) {
          this.wholesaleForm.quantity = Number(String.prototype.substring.call(newVal, 0, 9));
        }
      },
      'wholesaleForm.target_price': function(newVal) {
        if (newVal.length > 9) {
          this.wholesaleForm.target_price = String.prototype.substring.call(newVal, 0, 9);
        }
      }
    },
    beforeMount() {
      const numberValid = (rule, value, callback) => {
        const reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
        if (!value) {
          callback(new Error(this.$lang.requiredMsg.replace('%s', rule.key)));
        } else if (!reg.test(value)) {
          callback(new Error(this.$lang.requiredMsgNum.replace('%s', rule.key)));
        } else {
          callback();
        }
      };
      const emailValid = (rule, value, callback) => {
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!value) {
          callback(new Error(this.$lang.checkMessage.email));
        } else if (!reg.test(value)) {
          callback(new Error(this.$lang.checkMessage.email));
        } else {
          callback();
        }
      };
      this.rules = {
        goods_name: [
          {
            required: true,
            trigger: 'blur',
            message: this.$lang.requiredMsg.replace('%s', this.$lang.wholesale.productName)
          },
        ],
        quantity: [
          {
            required: true,
            trigger: 'blur',
            message: this.$lang.requiredMsg.replace('%s', this.$lang.wholesale.quantity)
          },
          {
            type: 'number',
            message: this.$lang.requiredMsgNum.replace('%s', this.$lang.wholesale.quantity)
          },
        ],
        target_price: [
          { validator: numberValid, trigger: 'blur', key: this.$lang.wholesale.targetPrice },
        ],
        user_name: [
          {
            required: true,
            trigger: 'blur',
            message: this.$lang.requiredMsg.replace('%s', this.$lang.wholesale.customerName)
          },
        ],
        user_email: [
          { validator: emailValid, trigger: 'blur' },
        ],
      };
    },
    methods: {
      handleCountry(val) {
        const countryObj = this.countryCurrency.find(item => item.countryId == val);
        this.wholesaleForm.currency = countryObj.currencyCode;
      },
      showDialog() {
        this.visibleWholesaleDialog = true;
        this.countryCurrency = this.$root.countryCurrency;
        const productInfo = Object.assign({}, this.$root.productInfo);
        const skuId = this.$root.selectHouse.skuId;
        const countryId = this.$root.countryId;
        const currency = this.countryCurrency.find(item => item.countryId == countryId).currencyCode;
        this.wholesaleForm = {
          goods_name: productInfo.spuName,
          sku_id: skuId,
          country: countryId,
          currency,
          countryId,
          last_type: 4,
          userId: getCookie('userId'),
        };
      },
      submitForm() {
        this.$refs.wholesaleForm.validate((valid) => {
          if (valid) {
            const countryItem = this.countryCurrency.find(item => item.countryId == this.wholesaleForm.country);
            const nameItem = countryItem.countryList.find(item => item.languageCode == this.$root.currLanguage);
            this.wholesaleForm.country = nameItem.countryName;
            this.$http.post('/api/wholesaleEnquiry', {
              ...this.wholesaleForm,
              store_id: this.$root.productInfo.storeId
            }).then(res => {
              this.$toast(this.$lang.wholesaleSuccess);
              this.visibleWholesaleDialog = false;
              this.submitLoading = false;
            }).catch(err => {
              this.submitLoading = false;
            });
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "~asset/scss/base.scss";
  .form-center{
    text-align: center;
  }
  /deep/ .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner:focus{
    border-color: rgba(0,0,0,0.85);
  }
  /deep/ .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-textarea__inner{
    border-color: #dcdfe6;
  }
  /deep/ .el-form-item:last-child{
    margin-bottom: 0;
  }
  @media only screen and (max-width: 1023px) {
    /deep/ .el-form-item{
      margin-bottom: r(16);
      &:last-child{
        margin-bottom: 0;
      }
      .el-form-item__content{
        position: relative;
        font-size: r(14);
        line-height: 1.8;
      }
    }
    /deep/ .el-input{
      font-size: r(14);
      .el-input__inner{
        height: r(40);
        line-height: r(40);
        padding: 0 r(16);
      }
    }
    /deep/ .el-form-item__error{
      position: static;
      font-size: r(12);
    }
    /deep/ .el-button{
      font-size: r(14);
      padding: r(12) r(20);
      border-radius: r(4);
    }
    .wholesale-container{
      .title{
        display: flex;
        align-items: center;
        height: r(24);
        margin-bottom: r(8);
        margin-left: r(32);
        color: rgba(0, 0, 0, 0.85);
        font-size: r(12);
        padding: 0 r(8);
        border-radius: r(2);
        border: 1px solid #EAEAEA;
        cursor: pointer;
        .icon-wholesale{
          width: r(12);
          height: r(12);
          margin-right: r(4);
        }
      }
      .wholesale-dialog-wrap{
        .wholesale-dialog{
          max-height: 90vh;
          overflow: auto;
          padding: r(16);
          font-size: r(20);
          color: rgba(0, 0, 0, 0.85);
          .dialog-title{
            font-size: r(20);
            font-weight: 600;
            margin-bottom: r(16);
            text-align: center;
            color: rgba(0, 0, 0, 0.85);
          }
          .wholesale-form-item{
            .form-label{
              position: relative;
              font-size: r(14);
              &.required:before{
                content: '*';
                position: absolute;
                right: r(-8);
                color: #ff2000;
                font-size: r(12);
              }
            }
          }
          .countrySelect{
            width: 100%;
          }
          .form-item-inline{
            display: flex;
            .el-form-item{
              flex: 1;
              &:first-child{
                padding-right: r(16);
              }
            }
          }
          .el-icon-close{
            position: absolute;
            right: r(16);
            top: r(16);
            cursor: pointer;
            font-size: r(22);
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    .el-form-item{
      margin-bottom: 16px;
    }
    /deep/ .el-form-item__error{
      position: static;
      padding-left: 174px;
    }
    .wholesale-container{
      .title{
        display: flex;
        align-items: center;
        height: 24px;
        margin-bottom: 8px;
        margin-left: 32px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 12px;
        padding: 0 8px;
        border-radius: 2px;
        border: 1px solid #EAEAEA;
        cursor: pointer;
        transition: all 0.1s ease;
        .icon-wholesale{
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }
        &:hover{
          color: #fff;
          border-color: $mainColor;
          background-color: $mainColor;
          .icon-wholesale path{
            fill: #fff;
          }
        }
      }
      .wholesale-dialog-wrap{
        width: 800px;
        max-width: 800px;
        .wholesale-dialog{
          position: relative;
          font-size: 20px;
          color: rgba(0, 0, 0, 0.85);
          .dialog-title{
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 32px;
            text-align: center;
            color: rgba(0, 0, 0, 0.85);
          }
          .wholesale-form{
            padding-right: 48px;
          }
          .wholesale-form-item{
            display: flex;
            align-items: center;
            .form-label{
              position: relative;
              width: 150px;
              margin-right: 24px;
              text-align: right;
              flex-shrink: 0;
              &.required:before{
                content: '*';
                position: absolute;
                right: -8px;
                top: -4px;
                color: #ff2000;
                font-size: 12px;
              }
            }
          }
          .countrySelect{
            width: 100%;
          }
          .form-item-inline{
            display: flex;
            .el-form-item{
              flex: 1;
            }
          }
          .el-icon-close{
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
            font-size: 22px;
            &:hover{
              color: $mainColor;
            }
          }
        }
      }
    }
  }
</style>