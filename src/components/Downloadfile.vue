<template>
    <div id="app">
        <h2>Download File in Vue Js using Axios</h2>
        
        <button @click="downloadFile()">DownLoad</button>
    </div>
  </template>
   
     
  <script>
      import axios from 'axios';
      import {image as image} from '../assets/Guarantor.jpg'
      export default {
        data:{
          link:'https://firebasestorage.googleapis.com/v0/b/trach-701b0.appspot.com/o/Guarantor.jpg?alt=media&token=0a965b36-f2e0-412f-abfb-7c59b2c7802a'
        },
        mounted() {
          this.downloadFile()
        },
        methods: {
            downloadImg(){
                let url = this.remoteURL();
                fetch(url).then((response)=>response.blob())
                .then((blob)=>{
                    saveAs(blob,'guarantor.jpg')
                });
                console.log('downloading',url);
            },
            remoteURL(){
                return this.link;
            }
          }
      }
      
      var _global = typeof window === 'object' && windown.window === window ?
      window : typeof self === 'object' && self.self === self ?
      self : typeof global === 'object' && global.global === global ?
      global :
      this

      function bom(blob, opts) {
  if (typeof opts === 'undefined') opts = {
    autoBom: false
  }
  else if (typeof opts !== 'object') {
    console.warn('Deprecated: Expected third argument to be a object')
    opts = {
      autoBom: !opts
    }
  }
  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], {
      type: blob.type
    })
  }
  return blob
}
function download(url,name,opts){
    var xhr = new XMLHttpRequest()
    xhr.open('GET',url)
    xhr.responseType = 'blob'
    xhr.onload = function(){
        saveAs(xhr.response,name,opts)
    }
  xhr.onerror = function(){
    console.error('could not download file')
  }
  xhr.send()
}
function corsEnabled(url){
     var xhr = new XMLHttpRequest()
     xhr.open('HEAD',url,false)
     xhr.send()
     return xhr.status >= 200 && xhr.status <=  299
}

function click(node){
    try{
        node.dispatchEvent(new MouseEvent('click'))
    }catch(e){
        var evt = document.createEvent('MouseEvents')
        evt.initMouseEvent('click',true,true,window,0,0,0,80,20,false,false,false,false,0,null)
        node.dispatchEvent(evt)
    }
}

var saveAs = _global.saveAs || (
    (typeof window ! == 'object' || window ! == _global) ? function saveAs(){}
)
