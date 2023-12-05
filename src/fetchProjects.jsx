import { useState, useEffect } from 'react'
import { createClient } from 'contentful'

const client = createClient({
  space: 'wz17xa28l72n',
  environment: 'master',
  accessToken: import.meta.env.VITE_API_KEY,
})

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: 'projects' })
      const projects = response.items.map((item) => {
        const { url, title, image } = item.fields
        const img = image?.fields?.file?.url
        const id = item.sys.id
        return { url, title, img, id }
      })
      setProjects(projects)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { loading, projects }
}
