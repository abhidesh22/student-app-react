import router from "../../routes/studentroutes";

test('Router Setup', () => {

    const routes = router.stack
      .filter(layer => layer.route)
      .map(layer => layer.route.path)
  
    expect(routes.includes('/')).toBe(true)
    expect(routes.includes('/byuni/:id')).toBe(true)
    expect(routes.includes('/bysubject/:id')).toBe(true)
  })