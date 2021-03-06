import { h, text } from 'hyperapp'

function flattenAll(input, result = []) {
    input.forEach(x => {
        if (Array.isArray(x)) flattenAll(x, result)
        else result.push(x)
    })
    return result
}

export default (type, props, ...children) =>
    typeof type === 'function'
        ? type(props, flattenAll(children))
        : h(
              type,
              props || {},
              flattenAll(children).map(child =>
                  typeof child === 'string' || typeof child === 'number'
                      ? text(child)
                      : child
              )
          )
