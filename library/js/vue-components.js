(function () {
  const { createApp, computed, ref } = Vue;

  const libraries = [
    {
      key: 'naive', mark: 'N', name: 'Naive UI', subtitle: 'Vue 3 Component Library', kind: 'PRIMARY', color: '#63e2b7',
      description: '简洁、克制且高度可配置的视觉语言，是 gotod-components-ui 默认主题和基础反馈组件的主要参考。',
      tags: ['主题变量', 'Data Table', 'Message', 'Dialog'],
      website: 'https://www.naiveui.com/', github: 'https://github.com/tusen-ai/naive-ui'
    },
    {
      key: 'element', mark: 'E', name: 'Element Plus', subtitle: 'Vue 3 UI Framework', kind: 'INTERACTION', color: '#409eff',
      description: '成熟的后台交互范式，影响了表单、步骤条、抽屉、气泡确认与复杂数据展示组件的结构。',
      tags: ['Form', 'Steps', 'Drawer', 'Tour'],
      website: 'https://element-plus.org/', github: 'https://github.com/element-plus/element-plus'
    },
    {
      key: 'ant', mark: 'A', name: 'Ant Design Vue', subtitle: 'Enterprise UI System', kind: 'SYSTEM', color: '#1677ff',
      description: '系统化的信息层级与企业级组件规范，为导航、菜单、表格和可访问性状态提供了重要启发。',
      tags: ['Menu', 'Layout', 'Table', 'A11y'],
      website: 'https://antdv.com/', github: 'https://github.com/vueComponent/ant-design-vue'
    },
    {
      key: 'vant', mark: 'V', name: 'Vant', subtitle: 'Mobile UI Components', kind: 'MOBILE', color: '#1989fa',
      description: '轻量、直接、适合触屏的交互方式，转化为游戏内移动端控制、弹出层和操作反馈体验。',
      tags: ['Popup', 'Toast', 'ActionSheet', 'Touch'],
      website: 'https://vant-ui.github.io/vant/', github: 'https://github.com/youzan/vant'
    }
  ];

  createApp({
    setup() {
      const query = ref('');
      const selectedFilter = ref('全部');
      const filters = ['全部', '主题', '表单', '反馈', '移动端'];
      const filterMap = { 主题: ['Naive UI'], 表单: ['Element Plus', 'Ant Design Vue'], 反馈: ['Naive UI', 'Vant'], 移动端: ['Vant'] };
      const filteredLibraries = computed(() => libraries.filter((library) => {
        const text = [library.name, library.subtitle, library.description, ...library.tags].join(' ').toLowerCase();
        const matchesQuery = text.includes(query.value.trim().toLowerCase());
        const matchesFilter = selectedFilter.value === '全部' || filterMap[selectedFilter.value].includes(library.name);
        return matchesQuery && matchesFilter;
      }));
      return { query, selectedFilter, filters, filteredLibraries };
    }
  }).mount('#vueComponentsApp');
})();
