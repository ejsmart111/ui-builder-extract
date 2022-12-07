<template>
   <div>
      <p style="text-align: center; display: none">This is the center</p>
       <div v-show="show" id="box" class="box">
         <div class="item-box">
            <div class="inner d">
               <div class="d" v-for="widget in widgets" :key="widget.id">
                  <p
                     class="items"
                     :style="{
                        fontSize: `${widget.size}px`,
                        color: widget.color, left: position(widget.x, 'x'), top: position(widget.y, 'y'),
                        fontWeight: widget.fontWeight,
                        textAlign: widget.textAlign,
                        width: widget.width+'px',
                        height: widget.height+'px'
                     }"
                     v-if="widget.type === 'Text'"
                  >{{widget.text}}</p>
                  <input
                  class="items"
                     v-else-if="widget.type === 'Input'"
                     :placeholder="widget.placeholder"
                     :style="{
                        padding: widget.paddingX+'px '+widget.paddingY+'px',
                        width: widget.width+'px',
                        border: widget.border,
                        left: position(widget.x, 'x'), top: position(widget.y, 'y'),
                        borderRadius: widget.borderRadius+'px'}"
                        v-model="widget.value"
                     />
                  <div
                     v-else-if="widget.type === 'Rounded'"
                     class="items"
                     :style="{
                        backgroundColor: background(widget),
                        padding: widget.paddingX+'px '+widget.paddingY+'px',
                        border: widget.border,
                        left: position(widget.x, 'x'), top: position(widget.y, 'y'),
                        borderRadius: `${widget.borderRadius}%`,
                        height: `${widget.height}px`,
                        width: `${widget.width}px`,
                     }"></div>
                  <div
                     v-else-if="widget.type === 'Squared'"
                     class="items"
                     :style="{
                        backgroundColor: background(widget),
                        padding: widget.paddingX+'px '+widget.paddingY+'px',
                        border: widget.border,
                        left: position(widget.x, 'x'), top: position(widget.y, 'y'),
                        borderRadius: `${widget.borderRadius}%`,
                        height: `${widget.height}px`,
                        width: `${widget.width}px`,
                     }"></div>
                  <font-awesome-icon
                     v-else-if="widget.type === 'Star'"
                     class="items"
                     :style="{
                        color: widget.color,
                        zIndex: '1000',
                        opacity: widget.isTransparent?0:1,
                        left: position(widget.x, 'x'), top: position(widget.y, 'y'),
                        fontSize: widget.size}"
                     icon="fa-star"
                  />
                  <button
                     :style="{
                        backgroundColor: background(widget),
                        padding: widget.paddingX+'px '+widget.paddingY+'px',
                        border: widget.border,
                        height: `${widget.height}px`,
                        width: `${widget.width}px`,
                        fontSize: `${widget.size}px`,
                        left: position(widget.x, 'x'), top: position(widget.y, 'y'),
                        color: widget.color,
                        borderRadius: `${widget.borderRadius}px`,
                        fontWeight: widget.fontWeight
                     }"
                     class="items"
                     v-else>{{widget.text}}</button>
               </div>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
import uiStore from './../ui-store.js'
import { getDatabase, ref, onValue } from 'firebase/database'

export default {
   data() {
      return {
         widgets: [],
         show: false
      }
   },
   computed: {
      background: function () {
         return widget => widget.isTransparent == 'true' ? 'transparent': widget.background
      },
      width() {
         return window.innerWidth
      },
      position: function () {
         return (num, type) => {
            if (type==='x'){
               if(this.width <= 500) {
                  return num-235+'px'
               }
               if(this.width <= 300) {
                  return num+'px'
               }
               // if(this.width > 1800) {
               //    return num-250+'px'
               // }
               return num-180+'px'
            }
            return num-150+'px'
         }
      },
   },
   methods: {
      loadWidgets: async function () {
         const db = getDatabase()
         const widgets = ref(db, 'widgets/');
         onValue(widgets, snap => {
            if (snap.exists) {
               this.widgets = snap.val()
            } else {
               this.widgets = uiStore
            }
            this.show = true
         })
      }
   },
   mounted() {
      setTimeout(() => {
      this.loadWidgets()
      }, 1000);
   }
}
</script>

<style scoped>
   .box {
      /* animation: scaleup 0.5s ease-in-out; */
      box-sizing: border-box !important;
      right: 0;
      bottom: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 700px;
      justify-content: center;
      align-items: center;
      /* margin: 0 auto; */
      position: fixed;
      width: 100%;
   }

   .item-box {
      align-items: center;
      display: flex;
      height: 700px;
      width: 100vw;
      justify-content: center;
      position: absolute;
      max-width: 100%;
      max-height: 100%;
   }

   .items {
      position: absolute;
   }

   .inner {
      height: 450px;
      width: 500px;
      position: relative;
   }

   @keyframes scaleup {
      0% {
         transform: scale(0);
      }

      100% {
         transform: scale(1);
      }
   }

   @media (max-width: 700px) {
      .d {
         transform: scale(0.8) !important;
      }
   }
   @media (max-width: 300px) {
      .d {
         transform: scale(0.6) !important;
      }
      .inner {
         height: 350px;
         left: -15px;
      }
   }
   .d {
      transform: scale(1);
   }
</style>
