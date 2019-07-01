<template>
  <div id="header">
    <div>
      <img class="logo" src="../assets/logoShishow.png" />
    </div>
    <div class="centered">
      <div class="group">
        <div id="get_data">
          <input
            v-model="word"
            type="text"
            id="search"
            required="required"
            @keydown.enter="onChangeInput"
          />
          <label for="search">Search...</label>
          <div class="bar"></div>
          <!-- <img class="sch" src="../assets/search-button.png" @click="onChangeInput"> -->
          <router-link to="search">
            <i class="fas fa-search fa-2x sch" @click="onChangeInput"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="logoSentence">SHISHOW</div>

    <div id="menuButtons">
      <div class="buttons">
        <router-link to="/directMessage">
          <i class="fas fa-envelope fa-3x dm"></i>
        </router-link>
        <i class="fas fa-gamepad fa-3x game"></i>
        <router-link to="/notification">
          <i class="fas fa-bell fa-3x bell"></i>
        </router-link>
        <router-link to="/">
          <i class="fas fa-home fa-3x home"></i>
        </router-link>
      </div>
      <div class="header-logo-menu">
        <div id="nav-drawer">
          <input id="nav-input" type="checkbox" class="nav-unshown">
          <label id="nav-open" for="nav-input">
            <span></span>
          </label>
          <label class="nav-unshown" id="nav-close" for="nav-input"></label>
          <div id="nav-content">
            <router-link to="/directMessage">
              <i class="fas fa-envelope fa-3x dm"></i>
            </router-link>
            <i class="fas fa-gamepad fa-3x game"></i>
            <router-link to="/notification">
              <i class="fas fa-bell fa-3x bell"></i>
            </router-link>
            <router-link to="/">
              <i class="fas fa-home fa-3x home"></i>
            </router-link>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import NormalBanner from "../components/NormalBanner";
import store from "../store";

export default {
  name: "navi",

  data() {
    return {
      word: ""
    };
  },

  components: {},

  methods: {
    onChangeInput() {
      this.commitChange(this.word);
    },

    commitChange(newValue) {
      //this.$emit("input", newValue);
      store.commit("onSearchWordInput", newValue);
    }
  }
};
/*
//menuボタンコンポーネント
var menuBtnComp = {
  template: `
    <div>
        <span class="menu_trigger">
            <span></span><span></span><span></span>
        </span>
    </div>
`
}

//root
var app = new Vue({
  el: '#app',
  data: {
    menuFlag: false,
    headH: "0px",
  },
  methods: {
    menuToggle: function() {
      //menuFlag切り替え
      this.menuFlag = !this.menuFlag;
    }
  },
  mounted: function() {
    //headerの高さ取得
    let h = document.getElementById("header").offsetHeight;
    this.headH = h + "px";
  },
  components: {
    'menu-btn': menuBtnComp,
  }
});*/

</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Pangolin&display=swap");

$secondary-color: #2196f3;
$searchbar_width: 400px;

#header {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: $header_height;

  background-color: $header_color;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;

  .centered {
    position: absolute;

    top: 13px;
    left: 100px;

    .group {
      position: relative;

      width: 100%;
      height: $searchbar_width/5;

      overflow: hidden;

      label {
        position: absolute;
        left: 0;

        top: $searchbar_width/15;
        color: #ccc;

        font: 400 $searchbar_width/15 Roboto;

        cursor: text;
        transition: 0.25s ease;
      }

      input {
        display: block;

        width: 100%;

        padding-top: $searchbar_width/15;

        border: none;
        border-radius: 0; // For iOS

        color: #fff;
        background: $header_color;

        font-size: $searchbar_width/15;

        transition: 0.3s ease;

        &:valid {
          ~ label {
            top: 0;
            font: 700 $searchbar_width/25 Roboto;
            color: #ccc;
          }
        }

        &:focus {
          outline: none;

          ~ label {
            top: 0;
            font: 700 $searchbar_width/25 Roboto;
            color: $secondary-color;
          }

          ~ .bar {
            background: $secondary-color;
          }

          ~ .sch {
            color: $secondary-color;
          }
        }

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $header_color inset;
          -webkit-text-fill-color: #fff !important;
        }
      }

      .bar {
        position: relative;

        content: "";

        width: $searchbar_width;
        height: $searchbar_width/150;

        background: #ccc;

        transition: 0.3s ease;
      }

      .sch {
        position: absolute;

        width: 45px;
        height: 45px;

        left: 355px;
        top: 22px;

        color: #fff;

        cursor: pointer;

        transition: 0.3s ease;
      }

      .sch:hover {
        color: $secondary-color;
      }
    }

  }

  .logo {
    position: absolute;

    width: $button_width;
    height: $button_height;

    top: 10px;
    left: 10px;
  }

  .logoSentence {
    position: absolute;

    font-family: "Pangolin", cursive;
    top: 20px;
    font-size: 60px;

    left: 50%;
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);

    color: $logo_sentence_color;

    text-shadow: 2px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
      -1px 1px 0 #000, 1px 1px 0 #000;
  }

  ::selection {
    background: rgba($secondary-color, 0.3);
    transition: 0.3s ease;
  }

  #menuButtons {
    position: absolute;

    height: 100%;
    top: 18px;

    right: 0;

    .dm {
      position: absolute;

      width: $button_width;
      height: $button_height;

      right: 50px;
      top: 10px;

      color: #fff;
    }

    .game {
      position: absolute;

      width: $button_width;
      height: $button_height;

      right: 150px;
      top: 10px;

      color: #fff;
    }

    .bell {
      position: absolute;

      width: $button_width;
      height: $button_height;

      right: 250px;
      top: 10px;

      color: #fff;
    }

    .home {
      position: absolute;

      width: $button_width;
      height: $button_height;

      right: 350px;
      top: 10px;

      color: #fff;
    }

    .dm:hover {
      opacity: 0.5;
    }

    .game:hover {
      opacity: 0.5;
    }

    .bell:hover {
      opacity: 0.5;
    }

    .home:hover {
      opacity: 0.5;
    }
  }
  .nav-unshown {
    display:none;
  }
  .buttons{
    display: none;
  }
}
@media (max-width: 800px){
#nav-drawer {
  position: relative;
}

/*チェックボックス等は非表示に*/
.nav-unshown {
  display:none;
}

/*アイコンのスペース*/
#nav-open {
  display: inline-block;
  right:10px;
  width: 90px;
  height: 90px;
  vertical-align: middle;
  cursor: pointer;
}

/*ハンバーガーの形をCSSで表現*/
#nav-open span, #nav-open span:before, #nav-open span:after {
  position: absolute;
  bottom:55px;
  height: 6px;//線の太さ
  width: 60px;//長さ
  border-radius:100px;
  background: #fff;
  display: block;
  content: '';
  cursor: pointer;
  /*.menu-trigger,
  .menu-trigger span {
    display: inline-block;
    transition: all .4s;
    box-sizing: border-box;
  }
  .menu-trigger {
    position: relative;
    width: 50px;
    height: 44px;
  }
  .menu-trigger span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
  }
  .menu-trigger span:nth-of-type(1) {
    top: 0;
  }
  .menu-trigger span:nth-of-type(2) {
    top: 20px;
  }
  .menu-trigger span:nth-of-type(3) {
    bottom: 0;
  }*/
}
#nav-open span:before {
  top: -22px;
}
#nav-open span:after {
  bottom: -22px;
}
#nav-open:hover {
  opacity: 0.5;
}

/*閉じる用の薄黒箇所*/
#nav-close {
  display: none;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  transition: .3s ease-in-out;
}

/*メニューの中身*/
#nav-content {
  overflow: auto;
  position: fixed;
  top: 0px;
  right: 20px;
  z-index: 9999;
  width: 90%;
  max-width: 380px;/*最大幅（お好みで調整を）*/
  height: 90px;
  background: $dark_color;
  border: solid;
  border-radius: 3px;
  border-color: #fff;
  transition: .3s ease-in-out;
  -webkit-transform: translateY(-1000px);
  transform: translateY(-1000px);
  box-shadow: 6px 0 25px rgba(0,0,0,.15);
    .dm {
      position: absolute;

      width: $button_width;
      height: $button_height;

      left: 290px;
      bottom: px;

      color: #fff;
    }

    .game {
      position: relative;

      width: $button_width;
      height: $button_height;

      left: 190px;
      top: 10px;

      color: #fff;
    }

    .bell {
      position: absolute;

      width: $button_width;
      height: $button_height;

      left: 100px;
      top: 10px;

      color: #fff;
    }

    .home {
      position: absolute;

      width: $button_width;
      height: $button_height;

      left: 10px;
      top: 10px;

      color: #fff;
    }
}

/*チェックがついたら表示させる*/
#nav-input:checked ~ #nav-close {
  display: block;
  opacity: .5;
}

#nav-input:checked ~ #nav-content {
  -webkit-transform: translateY(100px);
  transform: translateY(100px);
  box-shadow: 6px 0 25px rgba(0,0,0,.15);
  /*.menu-trigger.active span:nth-of-type(1) {
    -webkit-transform: translateY(20px) rotate(-45deg);
    transform: translateY(20px) rotate(-45deg);
  }
  .menu-trigger.active span:nth-of-type(2) {
    opacity: 0;
  }
  .menu-trigger.active span:nth-of-type(3) {
    -webkit-transform: translateY(-20px) rotate(45deg);
    transform: translateY(-20px) rotate(45deg);
  }*/
}

.header-logo-menu{
	display: flex;
	display: -moz-flex;
	display: -o-flex;
	display: -webkit-flex;
	display: -ms-flex;
	flex-direction: row;
	-moz-flex-direction: row;
	-o-flex-direction: row;
	-webkit-flex-direction: row;
	-ms-flex-direction: row;

}
  /*.menu-trigger,
  .menu-trigger span {
    display: inline-block;
    transition: all .4s;
    box-sizing: border-box;
  }
  .menu-trigger {
    position: relative;
    width: 50px;
    height: 44px;
  }
  .menu-trigger span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
  }
  .menu-trigger span:nth-of-type(1) {
    top: 0;
  }
  .menu-trigger span:nth-of-type(2) {
    top: 20px;
  }
  .menu-trigger span:nth-of-type(3) {
    bottom: 0;
  }
  .menu-trigger.active span:nth-of-type(1) {
    -webkit-transform: translateY(20px) rotate(-45deg);
    transform: translateY(20px) rotate(-45deg);
  }
  .menu-trigger.active span:nth-of-type(2) {
    opacity: 0;
  }
  .menu-trigger.active span:nth-of-type(3) {
    -webkit-transform: translateY(-20px) rotate(45deg);
    transform: translateY(-20px) rotate(45deg);
  }*/
}


</style>
