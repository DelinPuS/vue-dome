<template>
    <div id="div1">
        <p>欢迎使用 wangEditor 编辑器</p>
    </div>
</template>

<script>
    import E from "wangeditor"
    export default {
        name: "wangEditor",
        commands:{
          E
        },
        methods: {
            initE() {
                this.editor = new E('#div1');
                //这里各位小伙伴可以查询官网，根据自己的需求进行菜单栏调整
                this.editor.config.menus = [
                    'head',
                    'bold',
                    'fontSize',
                    'fontName',
                    'italic',
                    'underline',
                    'strikeThrough',
                    'indent',
                    'lineHeight',
                    'foreColor',
                    'backColor',
                    'link',
                    'list',
                    'todo',
                    'justify',
                    'quote',
                    'emoticon',
                    'image',
                    'video',
                    'table',
                    'code',
                    'splitLine',
                    'undo',
                    'redo',
                ]
                this.editor.create();
            },
        },
        mounted(){
            this.initE()
        }
    }
</script>

<style scoped>

</style>
