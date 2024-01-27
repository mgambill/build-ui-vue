export function Dropdown() {
  return () => {

  }
}

export const DropdownMenu = {
  setup() {
    return () => h(MyComp, null, {
      default: ({ text }) => h('p', text)
    })
  }
}

export const DropdownSeperator = {
  setup() {
    return () => h(MyComp, null, {
      default: ({ text }) => h('p', text)
    })
  }
}