<template>
  <div id="header">
    <div>
      <img class="logo" src="../assets/logoShishow.png" />
    </div>
    <div class="centered">
      <div class="group">
        <div id="get_data">
          <input type="text" id="search" v-model="search_key" required="required" />
          <label for="search">Search...</label>
          <div class="bar"></div>
          <router-link to="/SearchResult">
            <img class="sch" src="../assets/search-button.png" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="logoSentence">
      SHISHOW
    </div>

    <div id="menuButtons">
      <router-link to="/directMessage">
        <img class="dm" src="../assets/dm-button.png" />
      </router-link>
      <img class="game" src="../assets/gameuser-button.png" />
      <router-link to="/notification">
        <img class="bell" src="../assets/bell-button.png" />
      </router-link>
      <router-link to="/">
        <img class="home" src="../assets/home-button.png" />
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name:'navi'
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Pangolin&display=swap');

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

      //width: $searchbar_width;
      //height: $searchbar_width/2;

      //margin: auto;

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
          transition: .25s ease;
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

          transition: .3s ease;

          &:valid {
            ~label {
              top: 0;
              font: 700 $searchbar_width/25 Roboto;
              color: #ccc;
            }
          }
          &:focus {
            outline: none;

            ~label {
              top: 0;
              font: 700 $searchbar_width/25 Roboto;
              color: $secondary-color;
            }

            ~ .bar {
              background: $secondary-color;
            }
          }

          &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px $header_color inset;
            -webkit-text-fill-color: #fff !important;
          }
        }

          .bar {
            position: relative;

            content: '';

            width: $searchbar_width;
            height: $searchbar_width/150;

            background: #ccc;

            transition: .3s ease;
          }
          .sch{
            position: absolute;

            width: 45px;
            height: 45px;

            left: 355px;
            top: 22px;
          }
      }
    }

    .logo{
      position: absolute;

      width: $button_width;
      height: $button_height;

      top: 10px;
      left: 10px;
    }

    .logoSentence {
      position: absolute;

      font-family: 'Pangolin', cursive;
      top: 20px;
      font-size: 60px;

      left: 50%;
      transform: translate(-50%,0);
      -webkit-transform: translate(-50%, 0);

      color: $logo_sentence_color;
    }


    ::selection {
      background: rgba($secondary-color, .3);
      transition: .3s ease;
    }

    #menuButtons {
      position: absolute;

      height: 100%;

      right: 0;

      .dm {
        position: absolute;

        width: $button_width;
        height: $button_height;

        right: 50px;
        top: 10px;
      }

      .game {
        position: absolute;

        width: $button_width;
        height: $button_height;

        right: 150px;
        top: 10px;
      }

      .bell {
        position: absolute;

        width: $button_width;
        height: $button_height;

        right: 250px;
        top: 10px;
      }

      .home {
        position: absolute;

        width: $button_width;
        height: $button_height;

        right: 350px;
        top: 10px;
      }
    }

  }

</style>
