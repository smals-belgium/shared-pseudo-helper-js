import {DomainImpl} from "../../../src/lib/internal/DomainImpl";
import * as elliptic from "elliptic";
import {Base64} from "../../../src/lib/utils/Base64";

describe('Cookbook examples', () => {

  const domain8 = new DomainImpl(null, null, new elliptic.ec('p521'), null, 8, null);

  type DataSet = { x: string; y: string; scalar: string; blindedX: string; blindedY: string };


  it.each<DataSet>([
    {
      x: 'MQEAAAAAAAAAAA==',
      y: 'AIaELoSge8ZH9YhlIeahODkJDe23j1NUsQqwm32j1o+CdG6lIKhi1KqdONLRsXh+ciZjddZtm2dShPpp3K5aDxD8',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AV+VXF9H5LdTe4b1SSC7bHjp6b2enJmfplC6a3/jCR5fUHxXRSaRniYR8h7ugNqalGvP49cZnv6lf9B72RUG0rA/',
      blindedY: 'eSmII52CEtsZzSseUDY3YKLtSgqhq1wLPm9ncHBzGiv1wMIxmc1jSmpW36GhTt/s1P5shZGhG8ncoWKSGkJDyfw='
    },
    {
      x: 'MTICAAAAAAAAAAA=',
      y: 'AURV0WACmddkLIQK2IF76J0XGOygU+mSZ5gnbQFQ7WSyEUq9H/c0738e2pwVTiSxcI1xz1dGqTcYfotir3K0LQrz',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'ANuVBi6VwQfa2F8Y+OM4NOQ3EtEOaLhWA92tYheMdK5DN9iubeC2pyy7gWEQKHkr5wx9VLv5ahX+3cqXdi+KvSn1',
      blindedY: 'ASbUF7UOw7WtsUKPk7yVCL9gPZSoP9DD2Mm0cxSUJd1qrO5A+mbQfQhKnQdkXp00T0U5kHNIhVKRNQtN7tIqW1FK'
    },
    {
      x: 'MTIzAwAAAAAAAAAC',
      y: 'QRJBFXWQueauTw1qeNzTM+3qZtLLbykEN8LCmrn29Nv3IXHlLFa9Hhd/iuRBHDsgv4usav38XCWgxroQ8zWruQ4=',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AJDTs17IHvcNMOdK7qZjfbnze1QFoTm8HBbvTpfD3khGbM01goo+fhkJ77VsCAZGSxny/JnlG6Vy0QE8hA/fX3JL',
      blindedY: 'APgdC1G8Whnf/F84mrlrw5FsJxy7GTkjjuVZmXFQTGvb9A2ppoyckftqX6Da8H2jib1wJUbspxPjfXXwrB6yMRgh'
    },
    {
      x: 'MTIzNAQAAAAAAAAAAg==',
      y: 'CEI1kmrzzVyfeDxtQS3Gyme8//vbrYDneMIEmTFtaX2GyLhlA2JGNu0Wjd+qbpKUfMTB/rM+/H3jeAgFkR+lvIQ=',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AXRwRG7lqfJT8IHCDFE0Zi6SNM0mciAf/q5SpS2gdAzZdAu+L+lFnahEtHKSLt86l+T45kl1CVP8OM7LdcFJYuJn',
      blindedY: 'AYUMbBVYgqgshWpf487AKX3ESaW2ftxzP90tW5hNOxPgETMzcsODv7oEU2Zdip3WZUa+ZhSL1avLJh68I3DjYGac'
    },
    {
      x: 'MTI0NQQAAAAAAAAAAA==',
      y: 'AULi2K88MtySUCftPD3k2HAtq2myTVkgT33sMxm4Np2RJSdBJjPiamRyS3vIbKEaf0aNRan6B1lp4xJAr/ZAsdit',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AKJ4Hl8nxryGEvH++kUsg908A1W5od0ZFFsx6M1ayvhHsVHEWaPah5zblwn5KhLVwcRmpYAH1CjLMexa2YEV3FCB',
      blindedY: 'AINtXU2NW833s/ZZng2LFykdRmKnEoJ/U+QUvtltalUaH/YNPK6fdIll7maOXwTY21Ch4BFwgdy+qbKGy/oQLGUc'
    },
    {
      x: 'MTIzNDU2BgAAAAAAAAAA',
      y: 'AdnB30YG45HqxJyenfTwyomOV5NSCs9AbKKQFRBpEzDwuJ4FMak5UpxYElx7yGAGYjBcbEqV8vdjEBoGSewjYJx4',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AVNW4mBCsSdzEs+JAi1vME8T4o5bB2chKvOiwr8ZxSu/53Epo8avyesca7XABzLqAWeFGHLQZxR9NZuE9O7Ztthf',
      blindedY: 'AUWBi3+hVu2oceV6Et67l1GieDF0WOehUD1ulk78TI0qdcE6IeJWx/XWaY052oOqHy+0WjBJXJ7Unvgf4oXiPVfd'
    },
    {
      x: 'MTIzNDU2NwcAAAAAAAAAAA==',
      y: 'D5OUrNIZPGXYb+soXNh8VMiPYWudaCNAEZX/4B1EftfRMQOxStZBr23pCdCpaxpyZNc0HicDeBo+/TflO9kF10c=',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AJjABYkAK6Oo5WkvSfVfubJSvH4px0T9Y5//P5gFv///BvAqF3AiGKwdUDLrbWRkEVjZOYB6icxImRWA5j1cJH0j',
      blindedY: 'AQiKLKsMCcpLZKXHMvgSjYWXKLIZA0+lyvbO+BzZiaxiiJUBlUdZG4PhN/3MwEHP85nMMxBVMg9DDSqQM2+KLqU1'
    },
    {
      x: 'MTIzNDU2NzgIAAAAAAAAAAE=',
      y: 'AfSlL6dUUnkvIowaMspc6avl4TvCqC4WE/NmEb1q3edqhmjBi8d3ku4GahorYpTkKDDGf1mV36ynC/o2/Zh8PqC7',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AM95qyrZGpjcEpa/mXDyPdU/XkFQukQctmXRDUjS2Y1//x5BORsCxoRhEkOKYnt8u11g3vmm+dnc+t5Q37RevJzt',
      blindedY: 'AYZdFHNds2xdHG1ysp0YahcatO2mzyIjnN75NHo718Gxv2goRdvluyuJrCcH33Nnn/ei5NXrQNh9P8Q18uNReVgx'
    },
    {
      x: 'MTIzNDU2Nzg5CQAAAAAAAAAB',
      y: 'AWxzHDVoA6b08d7mpWsCn/AatpfglyUpsa4soLUzaS+HfRiwFT3EfvEd/1/CLVnVS0U/CUqT9tGNlhry0eWiyDMJ',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'Ad8a+82BH4JSpxQ/hT3jMEXLZ1AQ5zKmzyRviSrjfXZsCCpy2LXRbaBjpeAg1Yjl9xO5yazIfoqWxB/swoiKWYvc',
      blindedY: 'AJr1+M1tQeV+UH5Em1jNWCfmmOX+JVQNMt3myKJrY5o8b87gCnF/XqRkS/so6pCAo+s1ltrcDC6oGjpVxMp/GKR0'
    },
    {
      x: 'MTIzNDU2Nzg5MAoAAAAAAAAAAA==',
      y: 'ALoZzeaX7m5Yz1YEUKfbyNYSOblCaUyK+CagReh+9BArAcI+d77cdV3iZQ52hI06Xfbd67J7jXbTKuVoRsDbCIdY',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'ATXxK6NZFjvkwVVdDaZhxdloOo5FhvuZFse61cipoEk84ZLOk1w0qBqUsVWOm/upGAwMD8l1FmvuZ1gH+2u7ECd/',
      blindedY: 'AKGmtoy//h6dsi2nvNfywPA4g0G+vP94xkg+XU2Cd5vROjCbu109N/EtAf+3x+jcaUH00s6gO+ENinJ/I+hnJXs9'
    },
    {
      x: 'MTIzNDU2Nzg5MAoAAAAAAAAAAAAC',
      y: 'ANSl+G1Ihrn/y4KZmB2iO8ck7FXMvW6ExHVptUrKGfzInHfPukbx+xYNX9OhO/hRFQic3i7+Q6O6rlwhH4da4rrd',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'dQ1JgDTuuYJtHI0pQOiFJGDGBLoQYqyrENshTQKzHmDv5SSfsmbvN2PA553VleAM3xhxcB6mGmBOADrXsjhoRU8=',
      blindedY: 'AN++bpBMbAaib6MNKAUlfm/cZbKYWmG7xNyp5CqiIpR6MHATDMo6YGKvohBWncq/DUzet1DUKq1mpo1CCiGW6Mj6'
    },
    {
      x: 'MTIzNDU2Nzg5MAoAAAAAAAAAAAAAAAE=',
      y: 'ASvP5vN+onuAc4jzCxECvkdBbUTfu3XpV6tUNGh3x68aUmMkz/6kFzrd+DEw/9g+oP1cLsJCuyYlzjq2PRVxwmrl',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'fUzCiOY+2TINafVJV8Fw/b+FKmvupngaZa6P/GG25KRybVHIO8p2xHhW1xBsb1FvKskgAhIXUAoekeCRpPDTXuc=',
      blindedY: 'AdHBseAXBpudGLk+wmPOKAGv2af5y1KYqGsZfiNgGCZ6k+L91coa5HeBDOP9MIdT5dgdolvcbZXbUbYZUd3g/GmR'
    },
    {
      x: 'RzDziSOxzz1fT6lMEPYT8C5xenPFTFwOhZe4CACeLbcgAAAAAAAAAAA=',
      y: 'ALARpzdxggw1mTjxYZKwdGOP0oyYKYjmqye1MewE9SP1zCp5wtSOpedAZNeyN1THUV0+WoXLUDCB1NZWT25xz5N6',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'ARKh2805XnUxXwd7qAZ946L5HypbSD0J+A8W4Z+cmenFgeZFwbPkJpZ2tpso9EwOJkboGtVvzASFL/D/Lf94/vA=',
      blindedY: 'APNowE+iovhITW/UipIZQSFJGuTmYlacQDL+1bJgpbFtPrB3hv0jWrApaDOcYzgDFjTy1v892o18DnbO/z21SN1a'
    },
    {
      x: 'cmFuZG9tdGV4dAoAAAAAAAAABA==',
      y: 'AJXsoDpTMzMepP5g7Q0/aY11CrEp1cfgrw5+0S2XO5nNxzOu2jtpkgV9GOutVporRsKnLBs0VSglcRs+qINRK/4D',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'P/au8R8yR8aYFNOfY5EPu4DVlqXC+6Oh/Z5d6T/S4huWQgxsadxbcFRniWvnsjAsvitvRODmM8NK+nh1QwW1vIU=',
      blindedY: 'AeHg+C0RKMlsWzZem0sYd8+2+/i0XYHDCNiXTFz5fo6eHzOYFwUe3LLcPizLq/OhHWlJ5/zRlk5stjXpAiD/qpqT'
    }])(
      'should return a blinded $blindedX:$blindedY for a $x:$y input',
      ({x, y, scalar, blindedX, blindedY}) => {
        const random = Base64.decodeToBN(scalar);
        const pseudonym = domain8.pseudonymFactory.fromXY(x, y);
        const blindedValue = pseudonym.multiply(random);

        expect(blindedValue.x()).toBe(Base64.encodeFromBN(Base64.decodeToBN(blindedX)));
        expect(blindedValue.y()).toBe(Base64.encodeFromBN(Base64.decodeToBN(blindedY)));
      }
  );

  it.each<DataSet>([
    {
      x: 'MQEAAAAAAAAAAA==',
      y: 'AIaELoSge8ZH9YhlIeahODkJDe23j1NUsQqwm32j1o+CdG6lIKhi1KqdONLRsXh+ciZjddZtm2dShPpp3K5aDxD8',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AV+VXF9H5LdTe4b1SSC7bHjp6b2enJmfplC6a3/jCR5fUHxXRSaRniYR8h7ugNqalGvP49cZnv6lf9B72RUG0rA/',
      blindedY: 'eSmII52CEtsZzSseUDY3YKLtSgqhq1wLPm9ncHBzGiv1wMIxmc1jSmpW36GhTt/s1P5shZGhG8ncoWKSGkJDyfw='
    },
    {
      x: 'MTICAAAAAAAAAAA=',
      y: 'AURV0WACmddkLIQK2IF76J0XGOygU+mSZ5gnbQFQ7WSyEUq9H/c0738e2pwVTiSxcI1xz1dGqTcYfotir3K0LQrz',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'ANuVBi6VwQfa2F8Y+OM4NOQ3EtEOaLhWA92tYheMdK5DN9iubeC2pyy7gWEQKHkr5wx9VLv5ahX+3cqXdi+KvSn1',
      blindedY: 'ASbUF7UOw7WtsUKPk7yVCL9gPZSoP9DD2Mm0cxSUJd1qrO5A+mbQfQhKnQdkXp00T0U5kHNIhVKRNQtN7tIqW1FK'
    },
    {
      x: 'MTIzAwAAAAAAAAAC',
      y: 'QRJBFXWQueauTw1qeNzTM+3qZtLLbykEN8LCmrn29Nv3IXHlLFa9Hhd/iuRBHDsgv4usav38XCWgxroQ8zWruQ4=',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AJDTs17IHvcNMOdK7qZjfbnze1QFoTm8HBbvTpfD3khGbM01goo+fhkJ77VsCAZGSxny/JnlG6Vy0QE8hA/fX3JL',
      blindedY: 'APgdC1G8Whnf/F84mrlrw5FsJxy7GTkjjuVZmXFQTGvb9A2ppoyckftqX6Da8H2jib1wJUbspxPjfXXwrB6yMRgh'
    },
    {
      x: 'MTIzNAQAAAAAAAAAAg==',
      y: 'CEI1kmrzzVyfeDxtQS3Gyme8//vbrYDneMIEmTFtaX2GyLhlA2JGNu0Wjd+qbpKUfMTB/rM+/H3jeAgFkR+lvIQ=',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AXRwRG7lqfJT8IHCDFE0Zi6SNM0mciAf/q5SpS2gdAzZdAu+L+lFnahEtHKSLt86l+T45kl1CVP8OM7LdcFJYuJn',
      blindedY: 'AYUMbBVYgqgshWpf487AKX3ESaW2ftxzP90tW5hNOxPgETMzcsODv7oEU2Zdip3WZUa+ZhSL1avLJh68I3DjYGac'
    },
    {
      x: 'MTI0NQQAAAAAAAAAAA==',
      y: 'AULi2K88MtySUCftPD3k2HAtq2myTVkgT33sMxm4Np2RJSdBJjPiamRyS3vIbKEaf0aNRan6B1lp4xJAr/ZAsdit',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AKJ4Hl8nxryGEvH++kUsg908A1W5od0ZFFsx6M1ayvhHsVHEWaPah5zblwn5KhLVwcRmpYAH1CjLMexa2YEV3FCB',
      blindedY: 'AINtXU2NW833s/ZZng2LFykdRmKnEoJ/U+QUvtltalUaH/YNPK6fdIll7maOXwTY21Ch4BFwgdy+qbKGy/oQLGUc'
    },
    {
      x: 'MTIzNDU2BgAAAAAAAAAA',
      y: 'AdnB30YG45HqxJyenfTwyomOV5NSCs9AbKKQFRBpEzDwuJ4FMak5UpxYElx7yGAGYjBcbEqV8vdjEBoGSewjYJx4',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AVNW4mBCsSdzEs+JAi1vME8T4o5bB2chKvOiwr8ZxSu/53Epo8avyesca7XABzLqAWeFGHLQZxR9NZuE9O7Ztthf',
      blindedY: 'AUWBi3+hVu2oceV6Et67l1GieDF0WOehUD1ulk78TI0qdcE6IeJWx/XWaY052oOqHy+0WjBJXJ7Unvgf4oXiPVfd'
    },
    {
      x: 'MTIzNDU2NwcAAAAAAAAAAA==',
      y: 'D5OUrNIZPGXYb+soXNh8VMiPYWudaCNAEZX/4B1EftfRMQOxStZBr23pCdCpaxpyZNc0HicDeBo+/TflO9kF10c=',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AJjABYkAK6Oo5WkvSfVfubJSvH4px0T9Y5//P5gFv///BvAqF3AiGKwdUDLrbWRkEVjZOYB6icxImRWA5j1cJH0j',
      blindedY: 'AQiKLKsMCcpLZKXHMvgSjYWXKLIZA0+lyvbO+BzZiaxiiJUBlUdZG4PhN/3MwEHP85nMMxBVMg9DDSqQM2+KLqU1'
    },
    {
      x: 'MTIzNDU2NzgIAAAAAAAAAAE=',
      y: 'AfSlL6dUUnkvIowaMspc6avl4TvCqC4WE/NmEb1q3edqhmjBi8d3ku4GahorYpTkKDDGf1mV36ynC/o2/Zh8PqC7',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'AM95qyrZGpjcEpa/mXDyPdU/XkFQukQctmXRDUjS2Y1//x5BORsCxoRhEkOKYnt8u11g3vmm+dnc+t5Q37RevJzt',
      blindedY: 'AYZdFHNds2xdHG1ysp0YahcatO2mzyIjnN75NHo718Gxv2goRdvluyuJrCcH33Nnn/ei5NXrQNh9P8Q18uNReVgx'
    },
    {
      x: 'MTIzNDU2Nzg5CQAAAAAAAAAB',
      y: 'AWxzHDVoA6b08d7mpWsCn/AatpfglyUpsa4soLUzaS+HfRiwFT3EfvEd/1/CLVnVS0U/CUqT9tGNlhry0eWiyDMJ',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'Ad8a+82BH4JSpxQ/hT3jMEXLZ1AQ5zKmzyRviSrjfXZsCCpy2LXRbaBjpeAg1Yjl9xO5yazIfoqWxB/swoiKWYvc',
      blindedY: 'AJr1+M1tQeV+UH5Em1jNWCfmmOX+JVQNMt3myKJrY5o8b87gCnF/XqRkS/so6pCAo+s1ltrcDC6oGjpVxMp/GKR0'
    },
    {
      x: 'MTIzNDU2Nzg5MAoAAAAAAAAAAA==',
      y: 'ALoZzeaX7m5Yz1YEUKfbyNYSOblCaUyK+CagReh+9BArAcI+d77cdV3iZQ52hI06Xfbd67J7jXbTKuVoRsDbCIdY',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'ATXxK6NZFjvkwVVdDaZhxdloOo5FhvuZFse61cipoEk84ZLOk1w0qBqUsVWOm/upGAwMD8l1FmvuZ1gH+2u7ECd/',
      blindedY: 'AKGmtoy//h6dsi2nvNfywPA4g0G+vP94xkg+XU2Cd5vROjCbu109N/EtAf+3x+jcaUH00s6gO+ENinJ/I+hnJXs9'
    },
    {
      x: 'MTIzNDU2Nzg5MAoAAAAAAAAAAAAC',
      y: 'ANSl+G1Ihrn/y4KZmB2iO8ck7FXMvW6ExHVptUrKGfzInHfPukbx+xYNX9OhO/hRFQic3i7+Q6O6rlwhH4da4rrd',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'dQ1JgDTuuYJtHI0pQOiFJGDGBLoQYqyrENshTQKzHmDv5SSfsmbvN2PA553VleAM3xhxcB6mGmBOADrXsjhoRU8=',
      blindedY: 'AN++bpBMbAaib6MNKAUlfm/cZbKYWmG7xNyp5CqiIpR6MHATDMo6YGKvohBWncq/DUzet1DUKq1mpo1CCiGW6Mj6'
    },
    {
      x: 'MTIzNDU2Nzg5MAoAAAAAAAAAAAAAAAE=',
      y: 'ASvP5vN+onuAc4jzCxECvkdBbUTfu3XpV6tUNGh3x68aUmMkz/6kFzrd+DEw/9g+oP1cLsJCuyYlzjq2PRVxwmrl',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'fUzCiOY+2TINafVJV8Fw/b+FKmvupngaZa6P/GG25KRybVHIO8p2xHhW1xBsb1FvKskgAhIXUAoekeCRpPDTXuc=',
      blindedY: 'AdHBseAXBpudGLk+wmPOKAGv2af5y1KYqGsZfiNgGCZ6k+L91coa5HeBDOP9MIdT5dgdolvcbZXbUbYZUd3g/GmR'
    },
    {
      x: 'RzDziSOxzz1fT6lMEPYT8C5xenPFTFwOhZe4CACeLbcgAAAAAAAAAAA=',
      y: 'ALARpzdxggw1mTjxYZKwdGOP0oyYKYjmqye1MewE9SP1zCp5wtSOpedAZNeyN1THUV0+WoXLUDCB1NZWT25xz5N6',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'ARKh2805XnUxXwd7qAZ946L5HypbSD0J+A8W4Z+cmenFgeZFwbPkJpZ2tpso9EwOJkboGtVvzASFL/D/Lf94/vA=',
      blindedY: 'APNowE+iovhITW/UipIZQSFJGuTmYlacQDL+1bJgpbFtPrB3hv0jWrApaDOcYzgDFjTy1v892o18DnbO/z21SN1a'
    },
    {
      x: 'cmFuZG9tdGV4dAoAAAAAAAAABA==',
      y: 'AJXsoDpTMzMepP5g7Q0/aY11CrEp1cfgrw5+0S2XO5nNxzOu2jtpkgV9GOutVporRsKnLBs0VSglcRs+qINRK/4D',
      scalar: 'AZ2TzlDmMWQW/kgJng4nThRUW149uzE+SNBUp4T0/0kRO2/zg2os/8dOEzZrvQPGgv5l0Gk68qczZjt8yfO8FRcF',
      blindedX: 'P/au8R8yR8aYFNOfY5EPu4DVlqXC+6Oh/Z5d6T/S4huWQgxsadxbcFRniWvnsjAsvitvRODmM8NK+nh1QwW1vIU=',
      blindedY: 'AeHg+C0RKMlsWzZem0sYd8+2+/i0XYHDCNiXTFz5fo6eHzOYFwUe3LLcPizLq/OhHWlJ5/zRlk5stjXpAiD/qpqT'
    }])(
      'should return an unblinded $x:$y for a $blindedX:$blindedY input',
      ({x, y, scalar, blindedX, blindedY}) => {
        const random = Base64.decodeToBN(scalar);
        const pseudonym = domain8.pseudonymFactory.fromXY(blindedX, blindedY);
        const unblindedValue = pseudonym.multiplyByModInverse(random);

        expect(unblindedValue.x()).toBe(Base64.encodeFromBN(Base64.decodeToBN(x)));
        expect(unblindedValue.y()).toBe(Base64.encodeFromBN(Base64.decodeToBN(y)));
      }
  );
});
