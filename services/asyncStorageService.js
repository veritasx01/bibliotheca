import { utilService } from './util.js';
export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  hasEntity,
};

function query(entityType, delay = 0) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity.id === entityId);
    if (!entity) {
      console.log(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      );
      return null;
    }
    return entity;
  });
}

function post(entityType, newEntity, changeId = true) {
  newEntity = { ...newEntity };
  if (changeId) newEntity.id = utilService.makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id);
    if (idx < 0) {
      console.log(
        `Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`
      );
      return null;
    }
    const entityToUpdate = { ...entities[idx], ...updatedEntity };
    entities.splice(idx, 1, entityToUpdate);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function hasEntity(entityType, entity) {
  query(entityType).then((entities) => {
    const idx = entities.findIndex((ent) => ent.id === entity.id);
    return idx >= 0;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId);
    if (idx < 0) {
      console.log(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      );
      return;
    }
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

// Private functions

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
