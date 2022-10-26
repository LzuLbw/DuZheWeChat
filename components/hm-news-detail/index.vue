<template>
  <view class="hm-news-detail">
    <view class="hd">
      <img class="yunshu" :src="options.yunshu" />
      <view class="artcile">
        <view class="outer">
          <span class="author">{{ options.author }}</span>
          <view class="wrap">
            <img class="like" :src="options.like" />
            <img class="share" :src="options.share" />
          </view>
        </view>
        <span class="time">{{ options.time }}</span>
      </view>
    </view>
    <span class="title">{{ options.title }}</span>
    <view class="main">
      <view class="entryPicWrap"><img class="img" :src="options.img" /></view>
    </view>
    <view class="ft">
      <span class="content">{{ options.content }}</span>
    </view>
  </view>
</template>
<script>
export default {
  name: 'HmNewsDetail',
  props: {
    dataId: {
      type: String,
      default: 'hm-news-detail'
    },
    options: {
      type: Object,
      default: function() {
        return {
          yunshu:
            '/static/hm-news-detail/images/img_22946_0_0.png',
          author: '作者',
          like:
            '/static/hm-news-detail/images/img_22946_0_1.png',
          share:
            '/static/hm-news-detail/images/img_22946_0_2.png',
          time: '2 minutes ago',
          title: '这是文章标题这是文章标题',
          img:
            '/static/hm-news-detail/images/img_22946_0_3.png',
          content:
            '第 1 种是对数据进行子抽样，但它有一个明显缺点：可能因忽略部分数据而错失关键信息，甚至误解数据表达的含义。第 2 种是使用分布式计算。虽然在某些情况下这是一种有效的方法，但是管理和维护集群会带来巨大开销。想象一下，要为一个刚超出内存大小、大概 30-50GB 的数据集就建立一套集群，对我来说，这似乎有点“用力过猛”。'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    
  }
};
</script>
<style>
@import './index.response.css';
</style>
