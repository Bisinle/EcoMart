"""added  the phone_number column

Revision ID: 8c27687c162d
Revises: 1c5c7f64c5d8
Create Date: 2023-10-03 10:13:16.365437

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c27687c162d'
down_revision = '1c5c7f64c5d8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('phone_number', sa.String(), nullable=True))
        batch_op.drop_constraint('Customer_unique_constraint', type_='unique')
        batch_op.create_unique_constraint('Customer_unique_constraint', ['phone_number', 'email'])

    with op.batch_alter_table('vendor', schema=None) as batch_op:
        batch_op.add_column(sa.Column('phone_number', sa.String(), nullable=True))
        batch_op.drop_constraint('Vendor_unique_constraint', type_='unique')
        batch_op.create_unique_constraint('Vendor_unique_constraint', ['phone_number', 'email'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vendor', schema=None) as batch_op:
        batch_op.drop_constraint('Vendor_unique_constraint', type_='unique')
        batch_op.create_unique_constraint('Vendor_unique_constraint', ['email'])
        batch_op.drop_column('phone_number')

    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.drop_constraint('Customer_unique_constraint', type_='unique')
        batch_op.create_unique_constraint('Customer_unique_constraint', ['email'])
        batch_op.drop_column('phone_number')

    # ### end Alembic commands ###