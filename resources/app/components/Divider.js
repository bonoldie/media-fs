import React from 'react'
export const Divider = ({dividerChar}) => <li className="breadcrumb-item" style={{ fontWeight: 100 }}  >{dividerChar ? dividerChar : '/'}</li>
