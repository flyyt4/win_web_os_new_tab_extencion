import { ComponentProps } from 'react'



function Link({children, href, onClick, ...props}: ComponentProps<'a'>) {
    if (!href) return
    const url = new URL(href)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        const handlerClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
            e.preventDefault()
            onClick?.(e)
            //TODO open new program
        }
        return <a href={href} {...props} onClick={handlerClick}>{children}</a>
    }
    return <a href={href} {...props}>{children}</a>
}

export default Link
