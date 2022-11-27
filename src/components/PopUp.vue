<template>
   <div>
       <div v-show="show" id="box" class="box">
         <div class="item-box">
            <div class="inner">
               <div v-for="widget in widgets" :key="widget.id">
               <p
                  class="items"
                  :style="{
                     fontSize: `${widget.size}px`,
                     color: widget.color,left: position(widget.x), top: position(widget.y),
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
                     left: position(widget.x), top: position(widget.y),
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
                     left: position(widget.x), top: position(widget.y),
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
                     left: position(widget.x), top: position(widget.y),
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
                     left: position(widget.x), top: position(widget.y),
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
                     left: position(widget.x), top: position(widget.y),
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
      position: function () {
         return num => num-180+'px'
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
      display: block;
      height: 700px;
      justify-content: center;
      margin: 0 auto;
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
      height: 500px;
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
</style>
