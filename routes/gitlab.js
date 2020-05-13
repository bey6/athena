const router = require('koa-router')()
const fetch = require('node-fetch')

router.prefix('/gitlab')

router.get('/', async (ctx) => {
  await ctx.render('gitlab/index')
})

router.post('/release', async (ctx) => {
  try {
    if (!ctx.request.body.project_id) {
      ctx.body = {
        code: 400,
        msg: 'project_id is required.',
      }
    }
    if (!ctx.request.body.name) {
      ctx.body = {
        code: 400,
        msg: 'name is required.',
      }
    }
    if (!ctx.request.body.tag_name) {
      ctx.body = {
        code: 400,
        msg: 'tag_name is required.',
      }
    }
    if (!ctx.request.body.milestone) {
      ctx.body = {
        code: 400,
        msg: 'milestone is required.',
      }
    }

    if (!ctx.request.body.assets_name) {
      ctx.body = {
        code: 400,
        msg: 'assets name is required.',
      }
    }

    if (!ctx.request.body.assets_link) {
      ctx.body = {
        code: 400,
        msg: 'assets link is required.',
      }
    }

    const json = await (
      await fetch(
        `http://git.docimaxvip.com/api/v4/projects/${ctx.request.body.project_id}/releases`,
        {
          method: 'post',
          body: JSON.stringify({
            id: ctx.request.body.project_id,
            name: ctx.request.body.name,
            tag_name: ctx.request.body.tag_name,
            description: ctx.request.body.description,
            milestones: [...ctx.request.body.milestone.split(',')],
            assets: {
              links: [
                {
                  name: ctx.request.body.assets_name,
                  url: ctx.request.body.assets_link,
                },
              ],
            },
          }),
          headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': 'jULUa6UdNsXBLwsA65WR',
          },
        }
      )
    ).json()
    ctx.body = json
  } catch (error) {
    ctx.body = {
      code: error.code,
      msg: error.message,
    }
  }
})

module.exports = router
