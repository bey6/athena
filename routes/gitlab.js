const router = require('koa-router')()
const fetch = require('node-fetch')

router.prefix('/gitlab')

router.get('/', async (ctx) => {
  await ctx.render('gitlab/index')
})

router.post('/release', async (ctx) => {
  try {
    const json = await (
      await fetch('http://git.docimaxvip.com/api/v4/projects/10/releases', {
        method: 'post',
        body: JSON.stringify({
          id: '10',
          name: 'second release',
          tag_name: 'v0.1.6',
          description: `<h1>v0.1.6</h1>
<h2>update log</h2>

<li> 统一头部标题栏样式 </li>
<li> 添加退出登录的功能 </li>`,
          milestones: ['First Milestone'],
          assets: {
            links: [
              { name: 'home', url: 'http://git.docimaxvip.com/mdpms/portal' },
            ],
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': 'jULUa6UdNsXBLwsA65WR',
        },
      })
    ).json()
    console.log(json)
    ctx.body = json
  } catch (error) {
    ctx.body = {
      code: error.code,
      msg: error.message,
    }
  }
})

module.exports = router
