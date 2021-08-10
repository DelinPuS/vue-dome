<template>
    <div style="text-align: left">
        <div id = "myeditor" class="toolbar">
        </div>
    </div>
</template>

<script>
    import WangEditor from 'wangeditor'
    import createKityformula from "./kityformula";
    export default {
        name: "wang-edit",
        components: {
            // eslint-disable-next-line vue/no-unused-components
            WangEditor,
        },
        props: {
            text: {
                type: String // 父组件传过来的值
            }
        },
        data() {
            return {
                editor:null
            };
        },
        computed: {},
        mounted() {
            this.createEditor(); // 编辑器初始化
            this.editor.txt.html(this.text); //初始化赋值
        },
        methods: {
            createEditor(){
                this.editor = new WangEditor('#myeditor');
                // eslint-disable-next-line no-unused-vars
                const { $ } = WangEditor;
                const { PanelMenu, Panel } = WangEditor;
                this.editor.config.menus = [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                    'video',  // 插入视频
                    'code',  // 插入代码
                    'undo',  // 撤销
                    'redo'  // 重复
                ];
                // 带格式粘贴
                this.editor.config.pasteFilterStyle = false;
                //忽略粘贴内容中的图片
                /*this.editor.config.pasteIgnoreImg = false;*/
                this.editor.config.pasteFilterStyle = false;
                this.editor.config.uploadImgShowBase64 = true;
                /*this.editor.config.customUploadImg = function(files, insert){
                    // 图片自定义上传方法
                    that.httpUploadImg({type: 3, file: files[0]})
                        .then(res => {
                            insert(res); // 光标处插入图片
                        },(err) => {
                            console.log(err)
                        })
                }*/
                //https://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/01-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95.html?q=%E5%9B%BE%E7%89%87
                //https://www.kancloud.cn/wangfupeng/wangeditor/66804
                //官方dome
                //https://github.com/wangeditor-team/wangEdior-with-vue
                //官网https://www.wangeditor.com/
                //https://juejin.cn/post/6889639939328180231
                class Kityformula extends PanelMenu {
                    // 公式输入插件
                    constructor(editors) {
                        const $elem = WangEditor.$(
                            `<div class="w-e-menu">
                  <i class="iconfont icongongshi" style="font-size:18px;"></i>
              </div>`
                        );
                        super($elem, editors);
                    }
                    // 菜单点击事件
                    clickHandler() {
                        // 做任何你想做的事情
                        // 可参考【常用 API】文档，来操作编辑器
                        const conf = createKityformula(this.editor);
                        const panel = new Panel(this, conf);
                        panel.create();
                    }
                    tryChangeActive() {}
                }

                // 注册菜单
                const menuKey = "kityformulaKey"; // 菜单 key ，各个菜单不能重复
                this.editor.menus.extend("kityformulaKey", Kityformula);
                this.editor.config.menus = this.editor.config.menus.concat(menuKey);

                this.editor.config.onchange = (html) => {
                    this.info_ = html // 绑定当前值
                    this.$emit('change', this.info_) // 将内容同步到父组件中
                }
                this.editor.create();
            }
        },
        watch: {
            text(value) {
                if (value !== this.editor.txt.html()) {
                    this.editor.txt.html(value)
                }
            }
        }
    };
</script>

<style scoped>
    .toolbar {
        border: 1px solid #ccc;/*设置下拉棒*/
    }
    .w-e-text-container{
        height: 600px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
    }

    @import url("http://at.alicdn.com/t/font_2161824_78bvz3356e.css");
    .home {
        width: 100%;
        margin: auto;
        position: relative;
    .btn {
        position: absolute;
        right: 0;
        top: 0;
        padding: 5px 10px;
        cursor: pointer;
    }
    h3 {
        margin: 30px 0 15px;
    }
    textarea {
        width: 100%;
    }
    }
</style>
