import Dexie from 'dexie'

const indexedDb = new Dexie('GitlabPipelinesDashboard')
indexedDb.version(1).stores({
  projects: 'id,display',
  config: '++id,type'
})

export default indexedDb