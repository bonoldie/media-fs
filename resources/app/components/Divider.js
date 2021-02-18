import React from 'react'
import PropTypes from 'prop-types'

/* Simple list separetor element */
export const Divider = ({ dividerChar, plain }) => {
    return plain ?
        <span className="p-2" style={{ fontWeight: 100 }}>{dividerChar ? dividerChar : '/'}</span> :
        <li className="breadcrumb-item" style={{ fontWeight: 100 }}  >{dividerChar ? dividerChar : '/'}</li>
}

Divider.propTypes = {
    dividerChar: PropTypes.string,
    plain: PropTypes.bool
}