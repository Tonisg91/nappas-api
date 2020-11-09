const {Schema, model} = require('mongoose')

const auditProps = {
    createdAt: { type: Date , default: Date },
    updatedAt: { type: Date, default: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'}
}

const Model = defaultProps => {
    return (name, props) => {
        const schema = new Schema({
            ...defaultProps,
            ...props
        })

        return model(name, schema)
    }
}

const withAudit = Model(auditProps)

module.exports = withAudit