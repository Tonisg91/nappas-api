const {Schema, model} = require('mongoose')

const auditProps = {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'}
}

const Model = defaultProps => {
    return (name, props) => {
        const schema = new Schema({
            ...defaultProps,
            ...props
        },
        {
            timestamps: true,
            versionKey: false
        }
        )

        return model(name, schema)
    }
}

const withAudit = Model(auditProps)

module.exports = withAudit