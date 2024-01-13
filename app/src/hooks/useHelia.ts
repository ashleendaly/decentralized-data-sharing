import { useContext } from 'react'
import { HeliaContext } from '../contexts/HeliaContext'

export const useHelia = () => {
  const { helia, error, heliaStrings, starting } = useContext(HeliaContext)
  return { helia, error, heliaStrings, starting }
}