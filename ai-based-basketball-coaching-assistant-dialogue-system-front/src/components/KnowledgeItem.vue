<template>
    <div class="knowledge-item" @click="goToDetail">
      <h5 class="subsection" v-html="highlightedSubsectionName"></h5>
      <p class="content-preview" v-html="highlightedContentPreview"></p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      keyword: {
        type: String,
        required: true
      }
    },
    methods: {
        goToDetail() {
        // 新增：移除id中的连字符
        // const cleanedId = this.item.subsectionId.replace(/-/g, '');
        
        this.$router.push({
            name: 'KnowledgeView',
            params: { 
                id: this.item.subsectionId,
             },  // 使用处理后的id
            state: {
                subsectionName: this.item.subsectionName
            }
        });
        },
    },
    computed: {
      // 将关键词在标题中高亮显示
      highlightedSubsectionName() {
        console.log(this.item)
        const subsection = this.item?.subsectionName || ''
        const keyword = this.keyword?.trim()
        if (!subsection || !keyword) return subsection
  
        // 转义正则特殊字符
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(${escapedKeyword})`, 'gi')
        return subsection.replace(regex, '<span style="color: red">$1</span>')
      },
      // 原始内容预览
      fixedLengthPreview() {
        const content = this.item?.content || ''
        const paragraphs = content
          .split('\n')
          .filter(p => p.trim() !== '')
          .join(' ')
        const maxLength = 200
        return paragraphs.length > maxLength
          ? paragraphs.slice(0, maxLength) + '...'
          : paragraphs
      },
      // 高亮内容中的关键词
      highlightedContentPreview() {
        const content = this.fixedLengthPreview
        const keyword = this.keyword?.trim()
        if (!content || !keyword) return content
  
        // 转义正则特殊字符
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(${escapedKeyword})`, 'gi')
        return content.replace(regex, '<span style="color: red">$1</span>')
      }
    }
  }
  </script>
  
  <style scoped>
  .knowledge-item {
    padding: 16px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    min-height: 100px;
  }
  
  .subsection {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  
  .content-preview {
    margin-top: 8px;
    color: #666;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 限制两行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>