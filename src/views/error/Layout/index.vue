<template>
  <div class="content">
    <canvas class="snow" id="snow"></canvas>
    <div class="main-text">
      <h1 class="sorry">Sorry</h1>
      <h3>{{ content }}</h3>
      <a class="home-link" @click="turnBack">Back to home</a>
    </div>
    <div class="ground">
      <div class="mound">
        <div class="mound_text">{{ title }}</div>
        <div class="mound_spade"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initialStyle);
  },
  methods: {
    turnBack() {
      this.$clearMemorySes();
      this.$router.push({ path: "/home/welcome" });
    },
    initialStyle() {
      const ele = document.querySelector(".content"),
        main = document.querySelector(".top");
      if (main) {
        this.$setStyle(ele, "position", `absolute`);
        this.$setStyle(ele, "height", `${main.offsetHeight}px`);
        this.$setStyle(ele, "width", `100%`);
        this.$setStyle(ele, "top", `0`);
        this.$setStyle(ele, "left", `0`);
      }
    },
    initialListener() {
      window.addEventListener("resize", this.initialStyle);
    },
    initialOperation() {
      function ready(fn) {
        if (document.readyState != "loading") {
          fn();
        } else {
          document.addEventListener("DOMContentLoaded", fn);
        }
      }

      function makeSnow(el) {
        var ctx = el.getContext("2d");
        var width = 0;
        var height = 0;
        var particles = [];

        var Particle = function() {
          this.x = this.y = this.dx = this.dy = 0;
          this.reset();
        };

        Particle.prototype.reset = function() {
          this.y = Math.random() * height;
          this.x = Math.random() * width;
          this.dx = Math.random() * 1 - 0.5;
          this.dy = Math.random() * 0.5 + 0.5;
        };

        function createParticles(count) {
          if (count != particles.length) {
            particles = [];
            for (var i = 0; i < count; i++) {
              particles.push(new Particle());
            }
          }
        }

        function onResize() {
          width = window.innerWidth;
          height = window.innerHeight;
          el.width = width;
          el.height = height;

          createParticles((width * height) / 10000);
        }

        function updateParticles() {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = "#f6f9fa";

          particles.forEach(function(particle) {
            particle.y += particle.dy;
            particle.x += particle.dx;

            if (particle.y > height) {
              particle.y = 0;
            }

            if (particle.x > width) {
              particle.reset();
              particle.y = 0;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
            ctx.fill();
          });

          window.requestAnimationFrame(updateParticles);
        }

        onResize();
        updateParticles();

        window.addEventListener("resize", onResize);
      }

      ready(function() {
        var canvas = document.getElementById("snow");
        makeSnow(canvas);
      });
    }
  },
  mounted() {
    if (this.$route.path !== "/404") {
      this.initialStyle();
      this.initialListener();
    }
    this.initialOperation();
  }
};
</script>

<style lang="scss" scoped>
$col-sky-top: #bbcfe1;
$col-sky-bottom: #e8f2f6;
$col-fg: #5d7399;
$col-blood: #dd4040;
$col-ground: #f6f9fa;

@mixin trees($direction, $size) {
  $shadow: ();

  @for $i from 1 through 16 {
    $space: $size * 1.2;
    $rand: (random(20) / 10 - 1) * 50px;
    $shadow: append(
      $shadow,
      ($direction * $i * $space + $rand)
        (($direction * -$i * $space) + $rand)
        15px
        lighten($col-fg, random(20) + 10%),
      comma
    );
  }

  box-shadow: $shadow;
}

.sorry {
  position: relative;
  margin: 1rem;
}

.content {
  font-family: "Dosis", sans-serif;
  font-size: 32px;
  height: 100%;
  position: relative;

  z-index: 1;
  background-color: mix($col-sky-top, $col-sky-bottom);
  background-image: linear-gradient(
    to bottom,
    $col-sky-top 0%,
    $col-sky-bottom 80%
  );
  overflow: hidden;
}

.snow {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 20;
}

.main-text {
  position: relative;
  padding: 20vh 20px 0 20px;
  transform: translateY(-15%);
  text-align: center;
  line-height: 2em;
  font-size: 5vh;
}

.home-link {
  font-size: 0.6em;
  font-weight: 400;
  color: inherit;
  text-decoration: none;

  opacity: 0.6;
  border-bottom: 1px dashed transparentize($col-fg, 0.5);

  &:hover {
    opacity: 1;
  }
}

.ground {
  height: 160px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  background: $col-ground;
  box-shadow: 0 0 10px 10px $col-ground;

  $treeSize: 250px;
  &:before,
  &:after {
    // Trees
    content: "";
    display: block;
    width: $treeSize;
    height: $treeSize;
    position: absolute;
    top: -$treeSize/4;

    z-index: -1;
    background: transparent;
    transform: scaleX(0.2) rotate(45deg);
  }

  &:after {
    left: 50%;
    margin-left: -$treeSize / 1.5;
    @include trees(-1, $treeSize);
  }

  &:before {
    right: 50%;
    margin-right: -$treeSize / 1.5;
    @include trees(1, $treeSize);
  }
}

.mound {
  margin-top: -80px;

  font-weight: 800;
  font-size: 180px;
  text-align: center;
  color: $col-blood;
  pointer-events: none;

  $from-top: 50px;

  &:before {
    $w: 600px;
    $h: 200px;

    content: "";
    display: block;
    width: $w;
    height: $h;
    position: absolute;
    left: 50%;
    margin-left: -$w/2;
    top: $from-top;
    z-index: 1;

    border-radius: 100%;
    background-color: $col-sky-bottom;
    background-image: linear-gradient(
      to bottom,
      lighten($col-sky-top, 10%),
      $col-ground 60px
    );
  }

  &:after {
    // Blood
    $w: 28px;
    $h: 6px;
    content: "";
    display: block;
    width: $w;
    height: $h;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: $from-top + 18px;

    z-index: 2;
    background: $col-blood;
    border-radius: 100%;
    transform: rotate(-15deg);
    box-shadow: -($w * 2) ($h * 2) 0 1px $col-blood,
      -($w * 4.5) ($h) 0 2px $col-blood, -($w * 7) ($h * 4) 0 3px $col-blood;
  }
}

.mound_text {
  transform: rotate(6deg) translateY(-15%);
}

.mound_spade {
  $handle-height: 30px;

  display: block;
  width: 35px;
  height: 30px;
  position: absolute;
  right: 50%;
  top: 42%;
  margin-right: -250px;

  z-index: 0;
  transform: rotate(35deg);
  background: $col-blood;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
  }

  &:before {
    width: 40%;
    height: $handle-height;
    bottom: 98%;
    left: 50%;
    margin-left: -20%;
    background: $col-blood;
  }

  &:after {
    width: 100%;
    height: 30px;
    top: -$handle-height - 25px;
    left: 0%;
    box-sizing: border-box;
    border: 10px solid $col-blood;
    border-radius: 4px 4px 20px 20px;
  }
}

@media screen and (max-width: 500px) {
  .main-text {
    transform: translateY(-25%);
  }
  .mound_text {
    transform: translateY(-15%) rotate(6deg) scale(.8);
  }
  .ground {
    height: 100px;
  }
}
</style>
