<template>
  <div class="main">
    <el-container>
      <div class="right">
        <HostMain :data="Table"></HostMain>
      </div>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import HostFooter from '@/components/Host/HostFooter.vue';
import HostMain from '@/components/Host/HostMain.vue';
import axios from "axios";

const handleClick = () => {
  console.log('click')
}
const Table = ref([]);
const GetTableData = () => {
  axios({
    method: 'get',
    url: 'http://74.235.234.190/onos/v1/hosts',
    auth: {
      username: 'onos',
      password: 'rocks'
    },
  }).then((res)=>{
    console.log(res.data.hosts);
    Table.value = res.data.hosts
  })


  return {
    Table
  }
}
onMounted(() => {
  GetTableData();
  console.log("下面是table")
  console.log(import.meta.env);
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  overflow-x: hidden;
}

.input {
  padding: 20px 0px;
}

.right {
  width: 100%;
  height: calc(100vh - 105px);
}
</style>