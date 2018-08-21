import { $, viewEXT } from '../common/js/global.js'
import * as config from './config'
import 	Abstract from './abstract.class'
import { appCacheKey, appStorageKey } from './enum'

export default class School extends Abstract {
  constructor () {
    super()
  }
/**
 * 获取学校的全部班级列表
 *
 * @param {(lists: any[]) => void} callback
 * @memberof School
 */
  public getClasses (callback: (lists: any[]) => void) {
    const lists = this.cacheClasses('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=list', null, (ret) => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheClasses('set', ret.lists)
      }
    }, 'json')
  }

/**
 * 班级缓存方法
 *
 * @param {string} op get/set
 * @param {*} [lists=null]
 * @returns
 * @memberof School
 */
  public cacheClasses (op: string, lists = null) {
    const schoolid = this.getStorage(appStorageKey.userid)
    const cacheParam = schoolid
    let classes = null

    if (op === 'get') {
      classes = this._cache().get(appCacheKey.school_cjiaowu_classes)
      if (classes !== null) return classes.value
      else return null
    } else if (op === 'set') {
      classes = { param: cacheParam, value: lists }
      this._cache().set(appCacheKey.school_cjiaowu_classes, classes)
    }
  }

  /**
   * getTeacherByKeywords
   */
  public getTeacherByKeywords (keywords: string, schoolid: number, callback: (lists: any[]) => void) {
    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=teacher&op=search', { schoolid: schoolid, keywords: keywords }, (ret) => {
      callback(ret)
    }, 'json')
  }

  public getTeacherByClassesid (classesid: number, callback: (lists: any[]) => void) {
    const lists = this.cacheTeacherByClassesid('get', classesid)
    if (lists !== null) {
      callback(lists)
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=teacher&op=list', { classesid: classesid }, (ret) => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheTeacherByClassesid('set', classesid, ret.lists)
      }
    }, 'json')
  }

  public cacheTeacherByClassesid (op: string, classesid: number, lists = null) {
    const schoolid = this.getStorage(appStorageKey.userid)
    const cacheParam = schoolid + classesid
    let teachers = null

    if (op === 'get') {
      teachers = this._cache().get(appCacheKey.school_cjiaowu_teachers, classesid.toString())
      if (teachers !== null) return teachers.value
      else return null
    } else if (op === 'set') {
      teachers = { param: cacheParam, value: lists }
      this._cache().set(appCacheKey.school_cjiaowu_teachers + classesid, teachers, 0, classesid.toString())
    }
  }

  public getStudentByClassesid (classesid: number, callback: (lists: any[]) => void) {
    const lists = this.cacheStudentByClassesid('get', classesid)
    if (lists !== null) {
      callback(lists)
      return
    }

    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=student&op=list', { classesid: classesid }, (ret) => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheStudentByClassesid('set', classesid, ret.lists)
      }
    }, 'json')
  }

  public cacheStudentByClassesid (op: string, classesid: number, lists = null) {
    const schoolid = this.getStorage(appStorageKey.userid)
    const cacheParam = schoolid + classesid
    let students = null

    if (op === 'get') {
      students = this._cache().get(appCacheKey.school_cjiaowu_students, classesid.toString())
      if (students !== null) return students.value
      else return null
    } else if (op === 'set') {
      students = { param: cacheParam, value: lists }
      this._cache().set(appCacheKey.school_cjiaowu_students + classesid, students, 0, classesid.toString())
    }
  }
}
