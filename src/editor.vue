<template>
    <!-- Two-way Data-Binding -->
    <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
    />
</template>

<script>
    import Quill from 'quill'
    import { quillEditor } from "vue-quill-editor";
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
        ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
        [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
        [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
        [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
        [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
        [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
        [{ font: [] }], // 字体种类-----[{ font: [] }]
        [{ align: [] }], // 对齐方式-----[{ align: [] }]
        ["clean"], // 清除文本格式-----['clean']
        ["image", "video",'formula'], // 链接、图片、视频-----['link', 'image', 'video']
        [
            { table: 'TD' },
            { 'table-insert-row': 'TIR' },
            { 'table-insert-column': 'TIC' },
            { 'table-delete-row': 'TDR' },
            { 'table-delete-column': 'TDC' }
        ],
    ];
    export default {
        name: "editor",
        components: {
            quillEditor,
            // eslint-disable-next-line vue/no-unused-components
            Quill
        },
        data () {
            return {
                content: ``, // 富文本编辑器默认内容
                editorOption: {
                    //  富文本编辑器配置
                    modules: {
                        //工具栏定义的
                        toolbar: toolbarOptions,
                        handlers: {
                            // eslint-disable-next-line no-unused-vars
                            table: function (val) {
                                this.quill.getModule('table').insertTable(2, 3)
                            },
                            'table-insert-row': function () {
                                this.quill.getModule('table').insertRowBelow()
                            },
                            'table-insert-column': function () {
                                this.quill.getModule('table').insertColumnRight()
                            },
                            'table-delete-row': function () {
                                this.quill.getModule('table').deleteRow()
                            },
                            'table-delete-column': function () {
                                this.quill.getModule('table').deleteColumn()
                            }
                        },
                    table: true,
                    },
                    //主题
                    theme: "snow",
                    placeholder: "请输入正文"
                }
            };
        },
        methods:{
            jump:function () {
                this.$router.push({path:'/editor'})
            },
            onEditorBlur(quill) {
                console.log('editor blur!', quill)
            },
            //获得焦点事件
            onEditorFocus(quill) {
                console.log('editor focus!', quill)
            },
            // 准备富文本编辑器
            onEditorReady(quill) {
                console.log('editor ready!', quill)
            },
            //内容改变事件
            onEditorChange({ quill, html, text }) {
                console.log('editor change!', quill, html, text)
                this.content = html
            },
            addQuillTitle () {
                const oToolBar = document.querySelector('.ql-toolbar')
                const aButton = oToolBar.querySelectorAll('button')
                const aSelect = oToolBar.querySelectorAll('select')
                aButton.forEach(function (item) {
                    if (item.className === 'ql-script') {
                        item.value === 'sub' ? (item.title = '下标') : (item.title = '上标')
                    } else if (item.className === 'ql-indent') {
                        item.value === '+1' ? (item.title = '向右缩进') : (item.title = '向左缩进')
                    } else {
                        // eslint-disable-next-line no-undef
                        item.title = titleConfig[item.classList[0]]
                    }
                })
                aSelect.forEach(function (item) {
                    // eslint-disable-next-line no-undef
                    item.parentNode.title = titleConfig[item.classList[0]]
                })
            },
            getContentData () {
                return this.quill.getContents()
            },
        },
        mounted () {
            const dom = this.$el.querySelector('.editor')
            // eslint-disable-next-line no-undef
            this.quill = new Quill(dom, this.options)
            // this.quill.setContents(this.value)
            this.quill.on('text-change', () => {
                //   console.log(this.quill.getContents())
                //   this.$emit('contentData', this.quill.getContents())
                //   console.log(this.quill.root.innerHTML)
                this.$emit('contentData', this.quill.root.innerHTML)
            })
            this.$el.querySelector(
                '.ql-table-insert-row'
            ).innerHTML = `<svg t="1591862376726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6306" width="18" height="200"><path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z" p-id="6307"></path></svg>`
            this.$el.querySelector(
                '.ql-table-insert-column'
            ).innerHTML = `<svg t="1591862238963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="18" height="200"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="6510"></path></svg>`
            this.$el.querySelector(
                '.ql-table-delete-row'
            ).innerHTML = `<svg t="1591862253524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6632" width="18" height="200"><path d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z" p-id="6633"></path></svg>`
            this.$el.querySelector(
                '.ql-table-delete-column'
            ).innerHTML = `<svg t="1591862261059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6755" width="18" height="200"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="6756"></path></svg>`
            this.addQuillTitle()
        },
        activated () {
            this.quill.setContents({})
        },
    }
</script>

<style>
    .editor {
        line-height: normal !important;
        height: 500px;
    }
    .ql-snow .ql-tooltip[data-mode="link"]::before {
        content: "请输入链接地址:";
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: "保存";
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode="video"]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: "14px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
        content: "10px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
        content: "18px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
        content: "32px";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: "文本";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: "标题1";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: "标题2";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: "标题3";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: "标题4";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: "标题5";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: "标题6";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: "标准字体";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
        content: "衬线字体";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
        content: "等宽字体";
    }
</style>
