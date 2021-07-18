
const createService = (indexedDb) => {
  const getAllRecords = async (tableName) => {
    return await indexedDb.table(tableName).toArray();
  }
  const getAllRecordsDesc = async (tableName) => {
    return await indexedDb.table(tableName).orderBy('id').reverse().toArray();
  }
  const findRecordByFilter = async (tableName, filter) => {
    return await indexedDb.table(tableName).get(filter);
  }
  const getFilteredRecords = async (tableName, filter) => {
    return await indexedDb.table(tableName).where(filter).toArray();
  }
  const upsertRecord = async (tableName, record, identifier) => {
    const existingRecord = await indexedDb[tableName].get({ [identifier]: record[identifier] })
    if (existingRecord !== undefined) {
      await indexedDb[tableName].update(existingRecord.id, record)
    } else {
      await indexedDb[tableName].add(record)
    }
  }
  const updateRecordWhere = async (tableName, filter, changes) => {
    const existingRecord = await indexedDb[tableName].get(filter)
    if (existingRecord !== undefined) {
      await indexedDb[tableName].update(existingRecord.id, changes)
    }
  }
  const addRecords = async (tableName, records) => {
    return await indexedDb.table(tableName).bulkAdd(records)
  }
  const deleteRecords = async (tableName, filter) => {
    return await indexedDb.table(tableName).where(filter).delete()
  }
  const clearAllRecords = async (tableName) => {
    return await indexedDb.table(tableName).clear()
  }

  return {
    addRecords,
    updateRecordWhere,
    upsertRecord,
    getAllRecords,
    getAllRecordsDesc,
    findRecordByFilter,
    getFilteredRecords,
    deleteRecords,
    clearAllRecords
  }
}

export default createService