SATOSHIS_PER_BITCOIN = 100000000

def to_satoshis(num):
    '''
    Converts from any number type (int/float/Decimal) to satoshis (int)
    '''
    return int(round(num * SATOSHIS_PER_BITCOIN))

