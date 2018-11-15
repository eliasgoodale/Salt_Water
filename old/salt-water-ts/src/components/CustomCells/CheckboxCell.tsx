import * as React from 'react';

export default class extends React.Component<any, {}> {
	public render() {
		const { dataItem, field, onChange } = this.props
		const value = dataItem[field];
		return (
			dataItem.inEdit ?
				<td style={{ textAlign: "center", verticalAlign: "middle" }}>
					<input type="checkbox" id={field} className="k-checkbox" checked={value}
						onChange={(e: any) => {
							e.dataItem = dataItem
							e.field = field
							e.value = !value
							onChange(e)
						}}
					/>
					<label className="k-checkbox-label" htmlFor={field} />
				</td> :
				value ?
					<td style={{ textAlign: "center", verticalAlign: "middle" }}>
						<input type="checkbox" className="k-checkbox" defaultChecked={value} />
						<label className="k-checkbox-label" />
					</td>
					: <td />
		);
	}
}