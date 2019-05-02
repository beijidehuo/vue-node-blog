import fs from 'fs'
import path from 'path'
import koaRouter from 'koa-router'
const router = koaRouter()

export default app => {

    /*----------------------admin-------------------------------*/
    // 用户请求
    router.all('/*', async (ctx, next) => {
        // TODO::有的浏览器会是ctx.header
        let { referer } = ctx.request.header;

        if (referer) {
            const parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
            const url = referer;
            const urlResult = parse_url.exec(url);
            const fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
            const resField = [];
            fields.forEach(function (field, i) {
                resField[field] = urlResult[i];
            });
            let origin = resField.scheme + "://" + resField.host;
            if (resField.port) {
                origin += ":" + resField.port;
            }

            ctx.set("Access-Control-Allow-Origin", origin);
            ctx.set("Access-Control-Allow-Credentials", "true");
        } else {
            ctx.set("Access-Control-Allow-Origin", "*");
        }

        ctx.set("Access-Control-Allow-Headers", 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
        ctx.set("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        await next();
    });
    router.post('/admin_demo_api/user/login', app.admin.user.login)
    router.get('/admin_demo_api/user/info', app.admin.user.info)
    router.get('/admin_demo_api/user/list', app.admin.user.list)
    router.post('/admin_demo_api/user/add', app.admin.user.add)
    router.post('/admin_demo_api/user/update', app.admin.user.update)
    router.get('/admin_demo_api/user/del', app.admin.user.del)


    // 文章请求
    router.get('/admin_demo_api/blog/list', app.admin.blog.list)
    router.post('/admin_demo_api/blog/add', app.admin.blog.add)
    router.post('/admin_demo_api/blog/update', app.admin.blog.update)
    router.get('/admin_demo_api/blog/del', app.admin.blog.del)

    // 其他请求
    router.post('/admin_demo_api/markdown_upload_img', app.admin.other.markdown_upload_img)


    /*----------------------client-------------------------------*/
    // client/文章请求
    router.get('/client_demo_api/blog/list', app.client.blog.list)
    router.get('/client_demo_api/blog/info', app.client.blog.info)




    app.use(router.routes()).use(router.allowedMethods());
}