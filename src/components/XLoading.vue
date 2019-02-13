<template>
  <x-page class="mx-loading">
    <div class="base">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    </div>
  </x-page>
</template>

<script>
export default {
  name: 'x-loading',
  props: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.mx-loading
  background-color: #dedede;
  font-size: 12px;

.base
  height: 9em;
  left: 50%;
  font-size: 10px;
  margin: -7.5em;
  padding: 3em;
  position: absolute;
  top: 36%;
  width: 9em;
  transform: rotateX(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
  box-sizing: content-box;

.cube,
.cube:after,
.cube:before
  content: '';
  float: left;
  height: 3em;
  position: absolute;
  width: 3em;

.cube
  background-color: #0d50ba;
  position: relative;
  transform: translateZ(5em);
  transform-style: preserve-3d;
  transition: .25s;
  box-shadow: 13em 13em 1.5em rgba(0, 0, 0, 0.1);
  animation: anim 3s infinite;
  background-image: url('../assets/logo.png');
  background-size: 300% 300%;

.cube:after
  background-color: #1f60c5;
  transform: rotateX(-90deg) translate(0,3em);
  transform-origin: 100% 100%;

.cube:before
  background-color: #154592;
  transform: rotateY(90deg) translate(3em,0);
  transform-origin: 100% 0;

.cube:nth-child(1)
  animation-delay: 2s;
  background-position: 0 0;

.cube:nth-child(2)
  animation-delay: 2.05s;
  background-position: -100% 0;

.cube:nth-child(3)
  animation-delay: 2.1s;
  background-position: -200% 0;

.cube:nth-child(4)
  animation-delay: 2.15s;
  background-position: 0 -100%;

.cube:nth-child(5)
  animation-delay: 2.2s;
  background-position: -100% -100%;

.cube:nth-child(6)
  animation-delay: 2.25s;
  background-position: -200% -100%;

.cube:nth-child(7)
  animation-delay: 2.3s;
  background-position: 0 -200%;

.cube:nth-child(8)
  animation-delay: 2.35s;
  background-position: -100% -200%;

.cube:nth-child(9)
  animation-delay: 2.4s;
  background-position: -200% -200%;

@keyframes anim
  20%
    transform: translateZ(0.5em);
  60%
    transform: translateZ(5em);

</style>
