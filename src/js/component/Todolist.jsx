async function deleteAll() {
  try {
      let response = await fetch(urlBase, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          }
      })

      if (response.ok) {
          getTask()
      }
  } catch (error) {
      console.log(error)
  }
}


useEffect(() => {
  getTask()
}, [])