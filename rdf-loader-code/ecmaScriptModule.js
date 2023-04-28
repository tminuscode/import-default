let clownface
let iriResolve
let ns

async function loader ({ term, dataset }, { basePath } = {}) {
  const link = clownface({ term, dataset }).out(ns.code('link'))

  if (link.term && link.term.termType !== 'NamedNode') {
    throw new Error(`Cannot load ecmaScriptModule from term ${term.value}`)
  }

  const { method } = iriResolve(link.value, basePath)

  let code// = await import(filename)

  if (!method) {
    return code
  }

  // split method name by . for deep structures
  return method.split('.').reduce((code, property) => code[property], code)
}

loader.register = registry => {
  registry.registerNodeLoader(ns.code('EcmaScriptModule'), loader)
}

module.exports = loader
