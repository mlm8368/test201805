import { $, viewEXT, getAge } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../index/root.vue.html'),
  watch: {
    classesId: function (this: Vue, classesId: number): void {
      if (!classesId) return

      const school = new School()
      const util = new Util()
      // classesName
      school.getClasses((lists) => {
        for (const one of lists) {
          if (one.id === classesId) {
            this.$data.classesName = one.classesname
            break
          }
        }
      })
      // teacher
      this.$data.teacherListsLoading = true
      school.getTeacherByClassesid(classesId, (lists: any[]) => {
        this.$data.teacherListsLoading = false
        if (lists.length === 0) return
        this.$data.teacherLists = util.outTeacher(lists)
      })
      // student
      this.$data.studentListsLoading = true
      school.getStudentByClassesid(classesId, (lists: any[]) => {
        this.$data.studentListsLoading = false
        if (lists.length === 0 || !lists[0].id) return
        this.$data.studentLists = util.outStudent(lists)
      })
    }
  }
})
export default class Index extends Vue {
  public classesId: number = 0
  public classesName = ''
  public teacherLists: any[] = []
  public studentLists: any[] = []
  public teacherListsLoading = false
  public studentListsLoading = false
  public editTeacher: boolean = false
  public editStudent: boolean = false
  private school: School
  private util: Util
  private wvCjiaowuTeacher: any
  private wvCjiaowuStudent: any

  constructor () {
    super()
    this.school = new School()
    this.util = new Util()
  }

  public get totalTeacher () {
    return this.teacherLists.length
  }

  public get totalStudent () {
    return this.studentLists.length
  }

  public mounted (): void {
    this.$nextTick(() => {
      // tap
      this.setOntapEvents()

      // init
      this.classesId = this.school.getStorage(appStorageKey.current_jiaowu_classesid)
      if (!this.classesId) {
        this.classesId = 0
        this.school.setStorage(appStorageKey.current_jiaowu_classesid, this.classesId)
      }

      // getClasses
      this.school.getClasses((lists) => {
        if (lists.length === 0) {
          this.classesName = '您还未添加班级'
          return
        }

        if (this.classesId === 0) {
          this.classesId = lists[0].id
          this.classesName = lists[0].classesname
          this.school.setStorage(appStorageKey.current_jiaowu_classesid, this.classesId)
        } else {
          for (const one of lists) {
            if (one.id === this.classesId) {
              this.classesName = one.classesname
              break
            }
          }
        }
      })
    })
  }

  private setOntapEvents () {
    // teacher
    $('#teacher').on('tap', 'li', (e: any) => {
      const index = this.school.closest(e.target, 'li').dataset.index
      this.openTeacherWin(this.teacherLists[index], this.teacherLists[index].truename, 'view')
    })
    $('#teacher').on('tap', '.add', (e: any) => {
      this.openTeacherWin(null, '添加老师', 'add')
    })
    $('#teacher').on('tap', '.edit', (e: any) => {
      const index = this.school.closest(e.target, 'li').dataset.index
      this.openTeacherWin(this.teacherLists[index], this.teacherLists[index].truename, 'edit')
      return false
    })
    $('#teacher').on('tap', '.del', (e: any) => {
      const index = this.school.closest(e.target, 'li').dataset.index
      this.delTeacher(this.teacherLists[index].id, () => {
        this.school.alert('删除成功')
        this.updateTeacherLists()
      })
      return false
    })
    $('#teacher').on('tap', '.refresh', (e: any) => {
      this.updateTeacherLists()
    })
    window.addEventListener('updateTeacherLists', (event: any) => {
      this.updateTeacherLists()
    })
    // student
    $('#student').on('tap', 'li', (e: any) => {
      const index = this.school.closest(e.target, 'li').dataset.index
      this.openStudentWin(this.studentLists[index].id, this.studentLists[index].truename, 'view')
    })
    $('#student').on('tap', '.add', (e: any) => {
      this.openStudentWin(0, '添加学生', 'add')
    })
    $('#student').on('tap', '.edit', (e: any) => {
      const index = this.school.closest(e.target, 'li').dataset.index
      this.openStudentWin(this.studentLists[index].id, this.studentLists[index].truename, 'edit')
      return false
    })
    $('#student').on('tap', '.del', (e: any) => {
      const index = this.school.closest(e.target, 'li').dataset.index
      this.delStudent(this.studentLists[index].id, () => {
        this.school.alert('删除成功')
        this.updateStudentLists()
      })
      return false
    })
    $('#student').on('tap', '.refresh', (e: any) => {
      this.updateStudentLists()
    })
    window.addEventListener('updateStudentLists', (event: any) => {
      this.updateStudentLists()
    })
  }

  // teacher
  private openTeacherWin (teacherInfo: any, titleText: string, op: string) {
    const extras = { teacherInfo: teacherInfo, cid: this.classesId, op: op }
    const titleNView = { backgroundColor: '#00bcd4', titleText: titleText, titleColor: '#ffffff', type: 'default', autoBackButton: true, splitLine: { color: '#cccccc' } }

    if (!this.wvCjiaowuTeacher) {
      this.wvCjiaowuTeacher = $.openWindow({
        id: 'cjiaowu_teacher',
        url: './teacher' + viewEXT,
        styles: { top: '0px', backButtonAutoControl: 'hide', titleNView: titleNView },
        extras: extras
      })
    } else {
      this.school.showWaiting()
      $.fire(this.wvCjiaowuTeacher, 'doShow', extras)
      this.wvCjiaowuTeacher.setStyle({ 'titleNView': titleNView })
    }
  }
  private updateTeacherLists (): void {
    this.school._cache().remove(appCacheKey.school_cjiaowu_teachers, this.classesId.toString())
    this.teacherListsLoading = true
    this.school.getTeacherByClassesid(this.classesId, (lists: any[]) => {
      this.teacherListsLoading = false
      if (lists.length === 0) return
      this.teacherLists = this.util.outTeacher(lists)
    })
  }
  private delTeacher (tid: number, callback: () => void) {
    const w = this.school.showWaiting()
    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=teacher&op=del', { id: tid }, (ret) => {
      if (w) w.close()
      if (ret.status === 1) {
        callback()
      } else {
        this.school.alert(ret.msg)
      }
    }, 'json')
  }

  // student
  private openStudentWin (sid: number, titleText: string, op: string) {
    const extras = { sid: sid, cid: this.classesId, op: op }
    const titleNView = { backgroundColor: '#00bcd4', titleText: titleText, titleColor: '#ffffff', type: 'default', autoBackButton: true, splitLine: { color: '#cccccc' } }

    if (!this.wvCjiaowuStudent) {
      this.wvCjiaowuStudent = $.openWindow({
        id: 'cjiaowu_student',
        url: './student' + viewEXT,
        styles: { top: '0px', backButtonAutoControl: 'hide', titleNView: titleNView },
        extras: extras
      })
    } else {
      this.school.showWaiting()
      $.fire(this.wvCjiaowuStudent, 'doShow', extras)
      this.wvCjiaowuStudent.setStyle({ 'titleNView': titleNView })
    }
  }
  private updateStudentLists (): void {
    this.school._cache().remove(appCacheKey.school_cjiaowu_students, this.classesId.toString())
    this.school.getStudentByClassesid(this.classesId, (lists: any[]) => {
      if (lists.length === 0) return
      this.studentLists = this.util.outStudent(lists)
    })
  }
  private delStudent (sid: number, callback: () => void) {
    const w = this.school.showWaiting()
    $.get(config.siteHost.siteurl + 'index.php?moduleid=52&action=student&op=del', { id: sid }, (ret) => {
      if (w) w.close()
      if (ret.status === 1) {
        callback()
      } else {
        this.school.alert(ret.msg)
      }
    }, 'json')
  }
}

class Util {
  private school: School

  constructor () {
    this.school = new School()
  }

  public outTeacher (lists: any[]): any[] {
    let teacherLists = []
    lists.forEach((one) => {
      let tmp = {}
      tmp['id'] = one.id
      tmp['teacherpost'] = one.teacherpost
      tmp['truename'] = one.truename
      tmp['avatar'] = this.school.getAvatar(one.avatar)

      teacherLists.push(tmp)
    })
    return teacherLists
  }
  public outStudent (lists: any[]): any[] {
    let studentLists = []
    lists.forEach((one) => {
      let tmp = {}
      tmp['id'] = one.id
      tmp['babyname'] = one.babyname
      tmp['avatar'] = this.school.getAvatar(one.avatar)
      tmp['gender'] = this.school.getGender(one.gender)
      tmp['age'] = getAge(one.birthday + ' 1:1:1', this.school.getFormatDate() + ' 1:1:1')

      studentLists.push(tmp)
    })
    return studentLists
  }
}
