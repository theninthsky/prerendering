import type { FC, HTMLAttributes, ReactNode } from 'react'
import { css } from '@emotion/css'

import Tooltip from './Tooltip'

export type Item = {
  value: string
  description?: ReactNode
}

export type ListProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  items: Item[]
}

const List: FC<ListProps> = ({ className, name, items, ...otherProps }) => {
  return (
    <div className={className} {...otherProps}>
      <h3 className={style.name}>{name}</h3>

      <ol className={style.list}>
        {items.map(({ value, description }) => (
          <Tooltip title={description} placement="top-start">
            <li className={style.item}>{value}</li>
          </Tooltip>
        ))}
      </ol>
    </div>
  )
}

const style = {
  name: css`
    margin-bottom: 10px;
    font-weight: 500;
    color: var(--primary-color);
  `,
  list: css`
    display: flex;
    flex-direction: column;
    list-style: decimal inside;
  `,
  item: css`
    margin-bottom: 10px;
    cursor: pointer;
  `
}

export default List
