import checkbox from 'markdown-it-checkbox'
import { CompositeDisposable } from 'inkdrop'

module.exports = {
  configDefaults: {},

  activate () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(
      inkdrop.components.onComponentDidMount('MDEPreview', ::this.handlePreviewUpdate)
    )
    this.subscriptions.add(
      inkdrop.components.onComponentDidUpdate('MDEPreview', ::this.handlePreviewUpdate)
    )
    const { MDEPreview } = inkdrop.components.classes
    return MDEPreview.renderer.use(checkbox, {
      divWrap: true,
      divClass: 'ui checkbox md-checkbox'
    })
  },

  handlePreviewUpdate ({ node }) {
    return $(node).find('.md-checkbox > input[type="checkbox"]').on('click', this.hookCheckboxClick)
  },

  hookCheckboxClick (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
  },

  deactivate () {
    this.subscriptions.dispose()
  }

}
