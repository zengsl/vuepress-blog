import {defineClientConfig} from 'vuepress/client'
import {usePageData} from 'vuepress/client'

export default defineClientConfig({
    setup() {
        /*const page = usePageData()
        page.value.path = page.value.path && page.value.path.toLowerCase()
        console.log('page.value.path', page.value.path)*/
    }
})