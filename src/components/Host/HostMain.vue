<template>
	<el-header :data="data">
		<div class="input">
			<el-button type="primary">新增</el-button>
			<el-button type="danger" plain @click="handleDeleteAll" :disabled="!multipleSelection.length">
				删除
			</el-button>
		</div>
	</el-header>

	<el-main>
		<div class="table">
			<el-table :data="data" @selection-change="handleSelectionChange" style="width: 100%" @row-click="rowClick">
				<el-table-column type="selection" width="55" />
				<el-table-column prop="annotations.name" label="Name" width="240" />
				<el-table-column prop="mac" label="Mac" width="240" />
				<el-table-column prop="ipAddresses" label="Ipaddress" width="360" />
				<el-table-column fixed="right" label="操作">
					<template #default >
						<el-button link type="primary" size="small" @click="dialogVisible = true">发送流量</el-button>
						<el-button link type="primary" size="small" @click="deleteHost">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-main>

	<!-- 弹窗 -->
	<el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
  >
		<el-radio-group v-model="sendType" class="ml-4">
      <el-radio label="UDP" size="large"></el-radio>
      <el-radio label="TCP" size="large"></el-radio>
    </el-radio-group>

		<div class="demo-input-suffix">
			<el-row :gutter="20">
				<span class="ml-3 w-35 text-gray-600 inline-flex items-center"
					>主机名</span
				>
				<el-input
					v-model="sendHost"
					class="w-50 m-2"
					placeholder="主机名"
				/>
				
			</el-row>
		</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="sendFlow">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
 
<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useMainStore } from '@/stores/index'

const props = defineProps(['data'])
const multipleSelection = ref([])

// store
let store = useMainStore()

// 弹窗属性
let device = ref('')
const dialogVisible = ref(false)
const sendType = ref('UDP')
const sendRate = ref(1)
const sendHost = ref('h3')

const rowClick = (row)=>{
	device.value = row
}

const sendFlow = ()=>{
	console.log(sendHost.value)
	console.log(device.value.annotations.name)
	store.host = device.value.annotations.name
	store.dst = device.value.locations[0].elementId
	store.isChange = true
	console.log(store)
	dialogVisible.value = false
}
const deleteHost = ()=>{
	ElMessageBox.alert('确认删除', 'Title', {
    confirmButtonText: '确认',
    callback: (action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

const handleSelectionChange = (val) => {
	multipleSelection.value = val
	console.log(multipleSelection);
}

const handleDeleteAll = () => {
	console.log(multipleSelection);
}
</script>

<style scoped lang="less">
.input {
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
}

.table {
	width: 100%;
}
</style>